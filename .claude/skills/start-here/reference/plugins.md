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

> Plugin commands and marketplace names can change between Claude Code versions
> — check **code.claude.com/docs** for the current details.
