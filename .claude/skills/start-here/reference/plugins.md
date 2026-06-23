# Plugins

A **plugin** is a package that bundles Claude Code extensions so a whole team
gets them with one install — instead of each engineer recreating the same
skills by hand. A plugin can contain:

- **skills** (invoked as `/<plugin-name>:<skill-name>`),
- **sub-agents**,
- **hooks**,
- **MCP servers**,
- default settings.

This is the T3 endgame: take the skills, agents and hooks you built against The
Mill and package them so your squad shares them.

## Finding & installing

Use the **`/plugin`** command:

- `/plugin` → the **Discover** tab — browse plugins from the official and
  community marketplaces.
- Select one, choose a scope (user / project / local), and install. The CLI
  equivalent is `/plugin install <name>@<marketplace>`.

## Marketplaces

- **Official** (`claude-plugins-official`) — curated by Anthropic, available out
  of the box.
- **Community** (`anthropics/claude-plugins-community`) — GitHub-hosted
  community submissions; add it with
  `/plugin marketplace add anthropics/claude-plugins-community`.
- **Your own** — a team can host a private marketplace (a GitHub repo, URL, or
  local path) and add it with `/plugin marketplace add <source>`.

## Worth a look for The Mill

The official marketplace ships more than skills. A few that earn their place on
*this* repo (see the full catalog with `/plugin` → Discover, or the
[discover-plugins docs](https://code.claude.com/docs/en/discover-plugins)):

- **`typescript-lsp`** *(code intelligence)* — wires up the TypeScript language
  server, so after every edit Claude sees type errors, missing imports, and
  syntax issues automatically and fixes them in the same turn. For a TS repo
  whose T2 loop is built around a gate, this is the most useful one here. Needs
  the `typescript-language-server` binary on your `PATH`.
- **Integration plugins** *(pre-configured MCP servers)* — `github`, `linear`,
  `vercel`, `slack`, `sentry`, `supabase`. These are the off-the-shelf answer to
  the T1 **MCP wishlist** and the T3 "connect one live" exercise — no manual MCP
  setup.
- **`security-guidance`** — reviews each change for common vulnerabilities and
  fixes what it finds in the same session. A ready-made take on the T3 *security
  tax*.
- **`commit-commands`** and **`pr-review-toolkit`** — git/PR workflows; the
  latter pairs naturally with the `/babysit` loop.

> A plugin adds to your context every turn. The Discover panel shows a
> **context-cost** estimate and a **Will install** inventory (commands, agents,
> skills, hooks, MCP servers) — check both before installing, and only install
> from sources you trust.

## Scopes, reloading & team marketplaces

- **Install scope** — `user` (you, everywhere), `project` (everyone on this
  repo, recorded in `.claude/settings.json`), or `local` (you, this repo only).
- **Apply without restarting** — after install/enable/disable, run
  **`/reload-plugins`**.
- **Share with your squad** — the T3 endgame. Rather than each engineer
  installing by hand, commit an `extraKnownMarketplaces` entry to the project's
  `.claude/settings.json`; teammates who trust the repo get prompted to install:

  ```json
  {
    "extraKnownMarketplaces": {
      "mill-tools": { "source": { "source": "github", "repo": "kowalah-dev/mill-plugins" } }
    }
  }
  ```

> Plugin commands and marketplace names can change between Claude Code versions
> — check **code.claude.com/docs** for the current details.
