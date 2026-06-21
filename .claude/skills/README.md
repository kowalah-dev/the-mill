# Skills

This directory ships two skills: **`start-here`** (the course concierge) and
**`babysit`** (a worked example of a PR-shepherding `/loop` — study it, don't
treat it as the answer). Building your *own* skill is still the T1 "Skills,
Plugins & Artifacts" exercise.

A skill is a folder with a `SKILL.md` file:

```
.claude/skills/<skill-name>/SKILL.md
```

The `SKILL.md` has YAML frontmatter (at minimum a `description`) and a markdown
body of instructions. Invoke it with `/<skill-name>`, or let Claude pick it up
automatically when the task matches the description.

Ideas for The Mill: a `/confirm-booking` skill, a `/guest-summary` skill, or a
`/seed-check` skill that verifies the database looks right.
