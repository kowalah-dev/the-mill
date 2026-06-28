# Advanced — Orchestrate & Govern

The Advanced level is the frontier. You're no longer prompting Claude, or even
running one loop — you're writing the **orchestration**. One question runs through
the whole level: **who holds the plan?** Coordinate sub-agents by prompt and Claude
holds it, turn by turn. The advanced move is to write a **harness** — a script that
holds the plan — so the fan-out, the cross-checking and the stop are deterministic
and re-runnable. Then you govern a fleet of agents and ship what you build so it
runs without you.

> **Availability.** Some of this is gated or new: **dynamic workflows** need a paid
> plan with API access and are opted into per run; **agent teams** are experimental
> (an env flag); **Routines** are research preview. Each exercise notes a fallback.

## 1. Dynamic workflows — build the harness, not the prompt

The marquee feature. Instead of one conversation coordinating sub-agents in its
head, you write — well, *Claude* writes — a **script** that fans them out,
cross-checks their findings against each other, and synthesises a result. The plan
lives in code you can **read, edit, and rerun**. The shape is always
**fan-out → verify → synthesise**, with a hard budget; watch runs in `/workflows`.

Run one over this codebase: *"Author and run a dynamic workflow that audits every
route in `app/api/` in parallel — one agent per route looking for missing input
validation and unhandled status transitions — then a verification pass that filters
false positives, and a synthesis of the real findings. Show me the harness, run it,
and save it as a reusable command."* Then open the generated script — the plan as
code — and save it (`s`) to rerun on demand.

*Not enabled (no paid/API access)? Read a saved harness script together — the
plan-as-code is the lesson.*

## 2. The orchestration menu — who holds the plan?

Five ways to run agents, one question to choose between them:

- **Subagents** and **agent teams** → Claude holds the plan, turn by turn.
- **Dynamic workflows** → a script holds it.
- **Background sessions** and **worktrees** → you hold it.

Try an **agent team** for a multi-angle review: *"Spawn an agent team to review
this codebase from three angles in parallel — security, performance, and test
coverage — each teammate claiming its angle, then compare findings and surface the
disagreements."* The full map of the four approaches and when each fits is in
[`../reference/agents-and-workflows.md`](../reference/agents-and-workflows.md).

*Agent teams are experimental — set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. No
flag? Run the three angles as three subagents instead.*

## 3. Govern the fleet

Parallel and unattended raises the stakes. For every agent and automation:

- **Ownership** — who owns it? Who do you call when it misbehaves?
- **Permissions** — scope its `tools` and `permissionMode`. What runs unattended,
  what must it ask about? See
  [`../reference/permissions-and-settings.md`](../reference/permissions-and-settings.md).
- **Isolation** — `isolation: worktree` lets an agent work on its own copy of the
  repo without touching main.
- **Judgment gate** — a **hook** that spawns a sub-agent (or asks Claude) *"is this
  good?"* and blocks until yes. See [`../reference/hooks.md`](../reference/hooks.md).

Then the production failure modes — decide which the *code* should prevent and
which an *agent* should catch:

- **Idempotency** — what if a job runs **twice** at once?
- **Double-booking** — two bookings, same room, overlapping dates. The exact seam
  the Beginner edge-case tests leave open — the API doesn't prevent it.
- **Maintenance mid-stay** — a room goes into maintenance while occupied.

## 4. Ship it unattended — Routines & plugins

Make what you built durable.

- **Routine** (`/schedule`) — runs unattended in Anthropic's cloud, laptop off, on
  a schedule, an API call, or a GitHub event. *This* is the right home for Dom's
  nightly booking confirmation (read `PENDING`, confirm or flag each, record it):
  recurring and unattended, it was never a session `/loop`. *Routines are research
  preview — not available? Design it on paper: trigger, prompt, permissions.*
- **Plugin** — package the skills, sub-agents, hooks and workflows you built into a
  plugin so the whole squad gets them with one install instead of recreating them.
  See [`../reference/plugins.md`](../reference/plugins.md).

---

See [`../reference/claude-code-features.md`](../reference/claude-code-features.md),
[`../reference/agents-and-workflows.md`](../reference/agents-and-workflows.md), and
[`../reference/finding-skills.md`](../reference/finding-skills.md).
