# Finding & installing skills

A **skill** is a reusable workflow Claude can invoke — packaged as a `SKILL.md`
file with instructions (this `start-here` skill is one). You can write your own,
or install ones others have built.

## Built-in skills you already have

Some skills ship with Claude Code or are available in this environment — invoke
them with `/`:

- **`/claude-api`** — reference for the **Anthropic API / SDK and Managed
  Agents**. Loads accurate, current API guidance (tool use, streaming,
  structured outputs, model migration, building agents). It also activates
  automatically when you work in code that imports `anthropic` /
  `@anthropic-ai/sdk`. Useful in T3 when you go beyond Claude Code into the API.
- **Claude Code docs / "how do I…?"** — you can ask Claude directly how any
  Claude Code feature works, run **`/powerup`** for guided lessons, or read the
  full docs at **code.claude.com/docs**.

## Discovering more skills

- **skills.sh** — a directory for finding community skills. Browse for something
  close to what you need, then adapt it.
- **agentskills.io** — the open Agent Skills standard the format follows.
- **`/plugin`** — open the **Discover** tab to browse skills and plugins from
  the official and community marketplaces (see [plugins.md](plugins.md)).

## Adding a skill to this project

A project skill is just a folder with a `SKILL.md`:

```
.claude/skills/<skill-name>/SKILL.md
```

The `SKILL.md` needs YAML frontmatter (at minimum a `description`) and a markdown
body of instructions. Once the file exists, invoke it with `/<skill-name>` — no
restart needed. Supporting files (templates, examples, sub-docs) can live in the
same folder, exactly as this `start-here` skill keeps its `reference/` and
`t1`–`t3` guides.

Building your own skill is a **T1 exercise** — see [`../t1/README.md`](../t1/README.md).
