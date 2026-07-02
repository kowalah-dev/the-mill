# Hooks (reference)

A **hook** is a shell command Claude Code runs automatically at a fixed point in
its lifecycle. The point of a hook is **determinism**: it *always* runs, instead
of relying on the model to remember to. That makes hooks the right tool for the
"enforce a rule" parts of the Intermediate/Advanced exercises — the loop's gate, the protected
file — where "usually" isn't good enough.

This is the reference to build from; Intermediate §Hooks and Advanced governance ask you to
*write* one. The authoritative docs are the
[hooks guide](https://code.claude.com/docs/en/hooks-guide) and the
[hooks reference](https://code.claude.com/docs/en/hooks).

## The lifecycle events

Hooks attach to events. The ones you'll reach for most:

| Event | Fires when… | Typical use |
|-------|-------------|-------------|
| **PreToolUse** | before a tool runs | block an action (exit 2), or validate it |
| **PostToolUse** | after a tool succeeds | run the gate — format, typecheck, `npm test` |
| **UserPromptSubmit** | you submit a prompt | inject context before Claude sees it |
| **SessionStart** | a session begins/resumes | print today's state (e.g. pending bookings) |
| **Stop** / **SubagentStop** | the main agent / a subagent finishes | notify you, or assert work is complete |
| **Notification** | Claude needs input or permission | desktop alert so you're not watching the terminal |
| **PreCompact** | before context is compacted | snapshot state that summarisation might lose |
| **SessionEnd** | a session ends | flush logs |

## How a hook is configured

Hooks live in a **settings file** (see
[`permissions-and-settings`](https://code.claude.com/docs/en/settings) for which
one) under a `hooks` block, keyed by event. Each entry has a **matcher** (which
tools/paths it applies to) and a **command**:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npm test" }]
      }
    ]
  }
}
```

Two ways a hook talks back to Claude:

- **Exit code 2** — blocks the action (PreToolUse) or signals failure; whatever
  the command wrote to **stderr** is fed back to Claude as the reason.
- **JSON on stdout** — `{"decision": "block", "reason": "..."}` for fine control;
  `UserPromptSubmit` hooks use `additionalContext` to inject text.

## On The Mill

- **Enforce the gate.** A `PostToolUse` hook on `Edit|Write` under `app/api/**`
  that runs `npm test` (and `npx tsc --noEmit`) — so the Intermediate loop's gate fires
  *deterministically* after every change, not when the agent feels like it.
- **Protect the schema.** A `PreToolUse` hook matching `prisma/schema.prisma`
  that `exit 2`s with `Blocked: schema changes need a human` — the repo rule from
  `CLAUDE.md`, made unskippable.
- **Inject state.** A `UserPromptSubmit` hook that appends the latest `STATE.md`
  summary, so every turn starts knowing what last night's run did.
- **Tell you it needs you.** A `Notification` hook that sends a desktop alert
  when the loop pauses for approval before sending a confirmation email.

## Judgment hooks (advanced)

Some checks aren't a clean pass/fail a shell command can decide. For those, a
hook's `type` can call a model instead of running a command:

- **`"type": "prompt"`** — a single-turn LLM evaluation. e.g. "does this commit
  message match the repo's style?"
- **`"type": "agent"`** — a multi-turn check with tool access (read files, run
  commands) before it decides. **Experimental.**

These are the deterministic-hook idea extended to decisions that need judgment —
the same maker/checker instinct from the Intermediate level, fired automatically. Full schemas:
[prompt-based and agent-based hooks](https://code.claude.com/docs/en/hooks).

## Before you wire one up

- A hook runs with **your** privileges, every time it matches — keep the command
  cheap and side-effect-free where you can.
- Prefer a hook over a prompt instruction when the rule must *always* hold; keep
  judgment calls in the conversation (or a judgment hook), not a brittle script.
- See it live with **`/hooks`**.
