# Intermediate — Automate (the development loop)

The Intermediate level is where you stop prompting Claude by hand and start
**designing a small system that prompts it for you** — one that finds the work,
hands it to the agent, checks the result, records what happened, and decides the
next move. That shift is "loop engineering."

First, get the concept right. In Claude Code a **loop** (`/loop`, `/goal`) is a
**development** tool, scoped to your session: you keep the agent working until
tests pass, a backlog is cleared, a PR goes green. A job that runs **nightly and
unattended** — like confirming Dom's bookings every night — is *not* a loop;
that's a **Routine** (`/schedule`), a standing cloud automation. This level
builds a session **dev loop**; the booking job shows up only as the contrast.

The first lesson is a discipline, not a trick: **most tasks don't need a loop**,
and a loop without a real check is just the agent agreeing with itself on repeat.
So we work in three tiers — **decide**, then **build small**, then **harden** —
and the rule throughout is: *build the loop, stay the engineer.*

Before you start, read the committed `CLAUDE.md` and the `STATE.md` stub. The
`it.todo` edge cases in `__tests__/bookings.test.ts` are the backlog your loop
will drain — and it runs the `/write-test` skill you built at the Beginner level.

---

## Tier 1 — Decide: do you even need a loop?

Two questions, in order.

**First — is it worth automating at all?** Run the **4-condition test**; miss one
and a loop costs more than it returns:

1. **It repeats** — you'll run it more than once.
2. **Verification is automated** — a test/build/linter can fail the work
   *without you in the room*.
3. **Your token budget can absorb the waste** — loops re-read, retry, explore.
4. **The agent has senior-engineer tools** — it can run the code and see what
   breaks.

**Second — if it passes, which tool?** Are you *there*, working (a session
`/loop` / `/goal`), or should it run *unattended and recurring* (a **Routine**,
`/schedule`)? Same test, different tool.

**Exercise:** score three tasks and label each *manual* / session `/goal` /
*Routine*:

- **Drive the `it.todo` edge-case tests to green** — *passes*, and you're in the
  session → a session **`/goal`**.
- **"Redesign the booking schema"** — *fails*: a one-off judgment call with no
  objective "done." Keep that one in the chair.
- **Confirm Dom's bookings every night** — *passes the four conditions too*, but
  it's unattended and recurring → a **Routine** (`/schedule`), not a `/loop`.
  This is the distinction people most often get wrong.

That contrast — and knowing which tool fits — is the point of Tier 1.

---

## Tier 2 — Build small: the minimum viable loop

If the task passes, build the **smallest loop that works** — four parts, no
swarm. The Mill gives you all four:

| Part | What it is | In this repo |
|------|------------|--------------|
| One **automation** | keeps the agent working until the goal holds | `/goal` (or `/loop` + `.claude/loop.md`) |
| One **skill** | the context the agent would otherwise re-derive every run | the `/write-test` skill from Beginner |
| One **state file** | what's done and what's next, *outside* the conversation | `STATE.md` |
| One **gate** | the objective check that fails bad work | `npm test` |

The loop's job is **development**: drive the repo's `it.todo` edge-case tests to
green.

**Order matters — do not skip ahead:**

1. **Get one manual run reliable.** Pick a single `it.todo` in
   `__tests__/bookings.test.ts` and have Claude implement it (via your
   `/write-test` skill), then `npm test` — watch it go green. One iteration, by hand.
2. **Lean on the skill.** That `/write-test` skill is the context each iteration
   reuses instead of re-deriving how the tests are wired.
3. **Wrap it as a goal.** Run it as a capped `/goal`:
   ```
   /goal every it.todo in __tests__ is implemented and npm test passes
   ```
   `/goal` keeps working until a *separate* small model judges the condition true
   — the agent doing the work isn't the one grading it. See
   [`../reference/claude-code-features.md`](../reference/claude-code-features.md).
   For copy-pasteable, Mill-flavoured examples of all three verbs (`/goal`,
   `/loop`, `/schedule`) — including the shipped `/babysit` loop — see the
   [loop library](../reference/loop-examples.md).
4. **Add the gate.** Each run ends by running `npm test`; it only reports success
   if the suite is green. Append progress to `STATE.md` (which `it.todo`s are done,
   which remain) — a resumed run *picks up* instead of restarting.

When the loop reaches **double-booking**, the API doesn't enforce it — a faithful
test can't pass. The loop should *flag that*, not weaken the test. That's your
bridge into the Advanced level's production failure modes.

**The metric that matters is cost per accepted change**, not tokens spent. If
fewer than half the loop's changes are good enough to accept, you're doing the
review work the loop was supposed to save — stop and fix the gate.

**Finale:** show your `STATE.md` and the `it.todo` count dropping to zero (bar the
one it honestly flagged) with `npm test` green.

---

## Tier 3 — Harden: don't build a loop that hurts you

A loop runs while you're not watching, so the failure modes are the curriculum.

### Maker ≠ checker
Split the agent that *writes the tests* from a **verifier** that *checks them
against the spec* — define both in `.claude/agents/`, ideally with different
instructions. The model that did the work is "too nice grading its own homework";
a fresh verifier catches the weak or wrong test it talked itself into. This is why
the loop gates on `npm test` (objective) and not on an agent's opinion.

### Hooks
Add hooks in `.claude/settings.json` that enforce rules deterministically — e.g.
a `PostToolUse` hook running `npm test` after edits under `__tests__/**` or
`app/api/**`, or a `PreToolUse` hook blocking edits to `prisma/schema.prisma`
without confirmation. See [`../reference/hooks.md`](../reference/hooks.md) for the
event catalog, the config shape, and the new judgment (prompt/agent) hooks.

### The failure modes — answer each for The Mill
- **The Ralph Wiggum loop** (quiet failure): what *objectively* fails this loop?
  (`npm test` — a passing/failing suite, not a verifier with an opinion.)
- **Goal drift** over long runs: what spec does each run reread to stay on
  course? (`CLAUDE.md` — or add a `VISION.md`.)
- **The security tax:** a loop that *edits code and runs commands* unattended is
  powerful and dangerous. What may it run without asking? Where's the gate before
  anything irreversible — a `git push`, a `db:reset`, a force-write? Are any
  secrets leaking into `STATE.md` or logs?
- **Comprehension debt:** read the diffs the loop ships. The day you debug a
  system no one has read costs more than the tokens ever did.

---

## The honest version

Driving a test backlog to green is a *deliberately good* case for a loop — real
dev work with an objective gate. Most production tasks aren't, and the sources
below are blunt about it: most developers don't need a loop yet. The skill you're
learning is the judgment to tell the difference — including spotting when it's a
**Routine**, not a loop at all. **Build the loop, stay the engineer.**

## Further reading — where this comes from

These three tiers synthesise the emerging "loop engineering" literature, in
rough order of depth:

- **Addy Osmani — [_Loop Engineering_](https://addyo.substack.com/p/loop-engineering)**
  — the essay that named the practice and the building blocks (automations,
  skills, state, sub-agents, connectors) behind Tiers 2–3.
- **Anthropic — [_Building effective agents_](https://www.anthropic.com/engineering/building-effective-agents)**
  — the original write-up of the evaluator–optimizer (maker/checker) pattern the
  "Maker ≠ checker" section rests on.
- **Geoffrey Huntley — [_Ralph Wiggum as a software engineer_](https://ghuntley.com/ralph/)**
  — origin of the "Ralph Wiggum loop" failure mode in Tier 3.
- **0xCodez — [_Loop engineering: the 14-step roadmap_](https://x.com/0xCodez/status/2064374643729773029)**
  — an accessible thread that maps almost 1:1 onto these tiers (the 4-condition
  test, the four-part minimum viable loop, the failure modes); itself a synthesis
  of the three above.

---

See [`../reference/claude-code-features.md`](../reference/claude-code-features.md)
for `/loop`, `/goal`, `/agents` and `/hooks`, and `/powerup` for guided lessons.
