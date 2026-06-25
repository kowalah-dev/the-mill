# Rules

Optional, path-scoped instructions that load only when Claude works on matching
files — a tidier alternative to putting everything in `CLAUDE.md`.

Each rule is a markdown file with optional frontmatter:

```markdown
---
paths:
  - "prisma/**"
---

# Database rules
- All access goes through Prisma; no raw SQL.
- After changing the schema, run `npm run db:reset`.
```

A rule with no `paths` loads always; a rule with `paths` loads only when Claude
reads a matching file. This directory is empty by design — adding a scoped rule
(for `prisma/**` or `app/api/**`) is a good Beginner/Intermediate exercise.
