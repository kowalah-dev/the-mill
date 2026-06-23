# Permissions & settings (reference)

The "Govern" half of T3 rests on two mechanisms: **settings files** (where
configuration lives, and who it applies to) and **permissions** (what an agent
can do without asking). This is the reference for both. Authoritative docs:
[settings](https://code.claude.com/docs/en/settings),
[permissions](https://code.claude.com/docs/en/permissions),
[permission modes](https://code.claude.com/docs/en/permission-modes).

## Settings files & scope

Configuration is merged from several files. Which one you put a setting in
decides *who it applies to*:

| File | Applies to | Committed? |
|------|------------|------------|
| `~/.claude/settings.json` | you, across all projects | no (your machine) |
| `.claude/settings.json` | everyone on this repo | **yes** — share team rules here |
| `.claude/settings.local.json` | you, this repo only | no (gitignored) |
| Managed / policy settings | the whole org, set by an admin | n/a — wins over the rest |

Managed settings take precedence and can't be overridden locally — that's how an
organisation enforces a rule everywhere. For The Mill, a team-wide rule (e.g.
"never auto-edit the schema") belongs in the committed `.claude/settings.json`.

## Permissions: allow / ask / deny

Inside settings, a `permissions` block lists rules. Each rule is a tool name,
optionally narrowed by a specifier:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)", "Edit(app/api/**)", "Edit(lib/**)"],
    "ask":   ["Bash(npm run db:reset:*)"],
    "deny":  ["Edit(prisma/schema.prisma)", "Read(.env)"]
  }
}
```

- **allow** — runs without prompting.
- **ask** — always prompts, even in looser modes.
- **deny** — never runs, in any mode (including `bypassPermissions`).

`deny` and `ask` always win, so they're how you put a hard floor under an
unattended agent.

## Permission modes

A *mode* sets the baseline for how often Claude pauses; rules layer on top.
Cycle the common three with **Shift+Tab**, or start with `--permission-mode`, or
set a default with `permissions.defaultMode`:

| Mode | Runs without asking | Use for |
|------|---------------------|---------|
| `default` | reads only | review each action — sensitive work |
| `acceptEdits` | reads + file edits + common fs commands | iterating on code you'll review after |
| `plan` | reads only (no edits) | exploring before changing |
| `auto` *(research preview, gated)* | everything, with a background safety classifier | long tasks, fewer prompts |
| `dontAsk` | only pre-approved (`allow`) tools | locked-down CI / scripts |
| `bypassPermissions` | everything | isolated containers/VMs only |

**Protected paths** (`.git`, `.claude`, shell rc files, `.mcp.json`, …) are never
auto-approved except in `bypassPermissions` — even an `allow` rule won't
pre-approve a write to them.

## On The Mill — scoping the confirmation loop

The nightly loop runs unattended, so its permissions *are* its safety:

- **Pre-approve the safe, repetitive actions** so it doesn't stall asking:
  `allow: ["Bash(npm test:*)", "Edit(app/api/**)"]`.
- **Keep destructive/irreversible actions on `ask` or `deny`** — `npm run
  db:reset` should prompt; sending a confirmation email needs a human gate.
- **Lock the schema** with `deny: ["Edit(prisma/schema.prisma)"]`, the same rule
  the repo states in `CLAUDE.md` — belt-and-braces with a `PreToolUse`
  [hook](https://code.claude.com/docs/en/hooks-guide).
- **Scope each sub-agent.** A sub-agent's frontmatter can set its own `tools` and
  `permissionMode`: give the read-only *verifier* far less reach than the agent
  that edits.
- Save `bypassPermissions` for throwaway containers — never the training repo.

This is the concrete answer to the T3 §3 governance questions: what is each agent
allowed to do unattended, and what must it ask about?

---

See [T3 §3 — Governance](../t3/README.md) for the questions these settings
answer, and `/permissions` to inspect the active rules.
