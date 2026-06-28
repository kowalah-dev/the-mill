# Agents & dynamic workflows (advanced)

Most of this course runs in **one** Claude Code session. This page is for when
one session isn't the right shape — when you want work split across several
agents running at once. It's an advanced reference: reach for it after you're
comfortable with a single loop (the Intermediate level) and the orchestration
ideas in [the Advanced level](../advanced/README.md).

The full, authoritative map is Claude Code's
[**Run agents in parallel**](https://code.claude.com/docs/en/agents) docs. This
page is the Mill-flavoured version: the four approaches, when to reach for each,
and what each looks like against the booking system.

> **Before you fan out:** running several sessions or subagents at once
> *multiplies* token usage — the same warning as loops, louder. Give every
> fan-out a reason and a budget. See [Costs](https://code.claude.com/docs/en/costs).

## The four approaches

| Approach | What it gives you | Reach for it when | On The Mill |
|----------|-------------------|-------------------|-------------|
| **[Subagents](https://code.claude.com/docs/en/sub-agents)** | Delegated workers *inside one session*, each with its own context, returning a summary | A side task would flood your main conversation with search results, logs, or files you won't reference again | The Intermediate **maker/checker** verifier; an *explorer* that greps `app/` and reports back without dumping it all into your session |
| **[Agent view](https://code.claude.com/docs/en/agent-view)** *(research preview)* | One screen (`claude agents`) to dispatch and monitor background sessions, each in its own worktree | You have several independent tasks, want to hand them off, and step in only when one needs you | Dispatch the Beginner edge-case tests (double-booking, past check-in, maintenance) as separate background sessions |
| **[Agent teams](https://code.claude.com/docs/en/agent-teams)** *(experimental, off by default)* | Multiple coordinated sessions with a shared task list and inter-agent messaging, run by a lead | You want Claude to split a project into pieces, assign them, and keep workers in sync | Split the booking feature: one teammate owns `app/api/bookings`, one owns rooms, one owns tests |
| **[Dynamic workflows](https://code.claude.com/docs/en/workflows)** | A *script* that runs many subagents and cross-checks their results — beyond what one turn can coordinate | A job outgrows a handful of subagents, or findings need verifying against each other: a codebase-wide audit, a large migration, cross-checked research | Audit **every** route in `app/api/` for missing validation; or verify the double-booking logic from several adversarial angles |

The key distinction is **who holds the plan**: with subagents and agent teams,
Claude coordinates in its turn-by-turn judgement; with a dynamic workflow, a
*script* holds the plan, so the fan-out, the verification, and the stop are
deterministic. That makes workflows the right tool when the work is too big or
too important to leave to one conversation's memory.

## Subagents — the everyday one

A subagent is the natural next step from the Intermediate **Maker ≠ checker** split. You
define it as a markdown file in [`.claude/agents/`](../../../agents/README.md)
(`name` + `description` required; `tools`, `model`, `permissionMode`,
`isolation: worktree` optional), and the main session delegates to it when a
task matches its `description`. Two Mill-shaped uses:

- **A verifier** that checks the test-writer's work against the spec and `npm test`
  — the second pair of eyes the loop needs to run unattended.
- **An explorer** that answers "where does room-status get set?" by searching the
  codebase and returning just the answer, instead of filling your main context
  with file dumps.

Open the `/agents` panel to see live subagents (Running tab) and create or edit
your own (Library tab). A *forked* subagent inherits your full conversation
instead of starting fresh.

## Dynamic workflows — the advanced one

This is the piece nothing else in the repo covers. A workflow is a script that
spawns subagents in parallel, **cross-checks their findings against each other**,
and synthesises a result — the loop-engineering "maker/checker" idea scaled from
one verifier to a fleet. It shines on work a single session can't hold:

- **Audit** — fan an agent out over every file in `app/api/`, each looking for a
  different class of issue (missing validation, unhandled status transitions,
  N+1 queries), then a verification pass that filters false positives.
- **Migrate** — change a pattern across many files at once, each in its own
  worktree so they don't collide, then verify each against `npm test`.
- **Cross-check** — have several agents reason about the double-booking edge case
  from different angles and only keep findings a majority confirm.

The shape is always *fan out → verify → synthesise*, with a hard budget. Watch
runs with `/workflows`. The
[Orchestrate dynamic workflows](https://code.claude.com/docs/en/workflows) docs
cover writing one (or running a bundled one).

## Supporting tools

- **[Worktrees](https://code.claude.com/docs/en/worktrees)** — a separate git
  checkout per session so parallel agents never edit the same files. Subagents
  and sessions you run yourself can each take one; agent view assigns them
  automatically. (Agent teams *don't* isolate teammates — partition the work by
  file instead.) This is the `isolation: worktree` you met in Advanced governance.
- **`/batch`** — a packaged skill that splits one large change into 5–30
  worktree-isolated subagents, each opening its own PR. A ready-made use of
  subagents + worktrees, not a separate style.

## Where to watch running work

| You used… | Check on it with |
|-----------|------------------|
| Subagents in this session | `/agents` (Running tab) |
| Background items in this session | `/tasks` |
| Background sessions (agent view) | `claude agents` |
| A dynamic workflow | `/workflows` |

## Governance still applies

Everything from [Advanced governance](../advanced/README.md) gets *more* important once work is
parallel and unattended: scope each agent's tools and `permissionMode`, keep an
audit trail of what ran, and put a human gate before anything irreversible. More
agents means more surface area, not less responsibility.
