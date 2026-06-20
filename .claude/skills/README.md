# Skills

This directory is intentionally empty. It's where you'll add **skills** during
the T1 "Skills, Plugins & Artifacts" exercise.

A skill is a folder with a `SKILL.md` file:

```
.claude/skills/<skill-name>/SKILL.md
```

The `SKILL.md` has YAML frontmatter (at minimum a `description`) and a markdown
body of instructions. Invoke it with `/<skill-name>`, or let Claude pick it up
automatically when the task matches the description.

Ideas for The Mill: a `/confirm-booking` skill, a `/guest-summary` skill, or a
`/seed-check` skill that verifies the database looks right.
