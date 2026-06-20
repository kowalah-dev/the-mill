# T3 — Orchestrate & Govern

T3 builds on what you made in T2. You're no longer running one loop in one
session — you're orchestrating multiple agents, thinking about what happens when
automation meets production reality, and putting governance around it all.

## 1. Multi-agent orchestration

Take the fetch → confirm → exception agents from T2 and run them as a
**coordinated workflow** rather than one session doing everything in sequence.
Who hands off to whom? What does each agent return? Where does the shared state
(`STATE.md`, the database) live so they don't tread on each other?

## 2. Production failure modes

Pressure-test the confirmation loop:

- What happens if the loop **runs twice** at once? Is confirming a booking
  idempotent?
- What happens when two bookings **double-book** the same room for overlapping
  dates? (The missing edge-case tests from T1 are exactly this seam — the API
  doesn't prevent it yet.)
- What should happen when a room goes into **maintenance** mid-stay?

Decide which of these the *code* should prevent and which an *agent* should catch.

## 3. Governance

For every agent and automation you've built, answer:

- **Ownership** — who owns this agent? Who do you call when it misbehaves?
- **Permissions** — scope each agent's tools and `permissionMode`. What is it
  allowed to do unattended, and what must it ask about?
- **Logging** — what does a run record (`STATE.md` is a start)? Could you audit
  what the loop did last night?
- **Isolation** — use `isolation: worktree` so an agent experiments on its own
  copy of the repo without touching main.

## 4. Plugins

Package the skills, sub-agents and hooks you built into a **plugin** so your
whole squad gets them with one install — instead of each engineer recreating
them. See [`../reference/plugins.md`](../reference/plugins.md).

---

See [`../reference/claude-code-features.md`](../reference/claude-code-features.md)
and [`../reference/finding-skills.md`](../reference/finding-skills.md).
