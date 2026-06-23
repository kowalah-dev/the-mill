# T2 — Automate (the nightly confirmation loop)

T2 is where you stop prompting Claude by hand and start **designing a small
system that prompts it for you** — one that finds the work, hands it to the
agent, checks the result, records what happened, and decides the next move.
That shift is "loop engineering," and it's the leverage point for the rest of
your career with these tools.

But the first lesson is a discipline, not a trick: **most tasks don't need a
loop**, and a loop without a real check is just the agent agreeing with itself
on repeat. So we work in three tiers — **decide**, then **build small**, then
**harden** — and the rule throughout is: *build the loop, stay the engineer.*

Before you start, read the committed `CLAUDE.md` and the `STATE.md` stub so you
know the shape of the system.

---

## Tier 1 — Decide: do you even need a loop?

Run the **4-condition test** on a candidate task. Miss one condition and a loop
costs more than it returns — keep it as a manual prompt.

1. **The task repeats** (at least weekly) — so setup amortises.
2. **Verification is automated** — a test/build/linter can fail the work
   *without you in the room*.
3. **Your token budget can absorb the waste** — loops re-read, retry, explore.
4. **The agent has senior-engineer tools** — it can run the code and see what
   breaks.

**Exercise:** apply the test to two tasks in this repo and write down the
verdict for each:

- **The nightly booking confirmation** (process `PENDING` bookings) — it
  *passes*: it recurs, `npm test` is an automated gate, the agent can run the
  app, and there's a clear stop condition (no pending left).
- **"Redesign the booking schema"** — it *fails*: it's a one-off judgment call
  with no objective "done." Keep that one in the chair.

That contrast — when **not** to build a loop — is the point of Tier 1.

---

## Tier 2 — Build small: the minimum viable loop

If the task passes, build the **smallest loop that works** — four parts, no
swarm. The Mill gives you all four:

| Part | What it is | In this repo |
|------|------------|--------------|
| One **automation** | fires on a cadence and stops on a clear condition | `/loop` + `.claude/loop.md` |
| One **skill** | the project context the agent would otherwise re-derive every run | a skill you build in `.claude/skills/` |
| One **state file** | what's done and what's next, *outside* the conversation | `STATE.md` |
| One **gate** | the objective check that fails bad work | `npm test` |

**Order matters — do not skip ahead:**

1. **Get one manual run reliable.** By hand in a session: fetch pending bookings
   (`GET /api/bookings/pending`), confirm one that's valid
   (`PATCH /api/bookings/[id]` `{ "status": "CONFIRMED" }`), flag one that isn't.
2. **Turn it into a skill.** Capture that workflow as a `SKILL.md` so every run
   starts from the same context instead of re-deriving it.
3. **Wrap it in a loop.** `/loop 30m` re-runs on a cadence; a bare `/loop` is
   self-paced (Claude picks the interval and can stop when the queue is empty).
   Use **`/goal`** when you want it to run *until a verified condition holds*
   rather than on a fixed beat — see
   [`../reference/claude-code-features.md`](../reference/claude-code-features.md).
   For copy-pasteable, Mill-flavoured examples of all three verbs (`/goal`,
   `/loop`, `/schedule`) — including the confirmation queue as a capped goal and
   the shipped `/babysit` loop — see the
   [loop library](../reference/loop-examples.md).
4. **Add the gate.** Each run ends by running `npm test`; it only reports
   success if the suite is green. Append a run summary to `STATE.md` (timestamp,
   #confirmed, #flagged and why) — tomorrow's run *resumes* instead of restarting.

**The metric that matters is cost per accepted change**, not tokens spent. If
fewer than half the loop's changes are good enough to accept, you're doing the
review work the loop was supposed to save — stop and fix the gate.

**Finale:** show your `STATE.md` and a freshly **CONFIRMED** booking appearing
on the dashboard.

---

## Tier 3 — Harden: don't build a loop that hurts you

A loop runs while you're not watching, so the failure modes are the curriculum.

### Maker ≠ checker
Split the agent that *confirms* from a **verifier** that *checks against the
spec* — define both in `.claude/agents/`, ideally with different instructions.
The model that did the work is "too nice grading its own homework"; a fresh
verifier catches what it talked itself into. This is why the loop gates on
`npm test` (objective) and not on an agent's opinion.

### Hooks
Add hooks in `.claude/settings.json` that enforce rules deterministically — e.g.
a `PostToolUse` hook running `npm test` after edits under `app/api/**`, or a
`PreToolUse` hook blocking edits to `prisma/schema.prisma` without confirmation.

### The failure modes — answer each for The Mill
- **The Ralph Wiggum loop** (quiet failure): what *objectively* fails this loop?
  (`npm test` — a passing/failing suite, not a verifier with an opinion.)
- **Goal drift** over long runs: what spec does each run reread to stay on
  course? (`CLAUDE.md` — or add a `VISION.md`.)
- **The security tax:** the loop's job implies *sending confirmation emails* —
  what permissions is it scoped to, what's the human approval gate before
  anything irreversible, and are any secrets leaking into `STATE.md` or logs?
- **Comprehension debt:** read the diffs the loop ships. The day you debug a
  system no one has read costs more than the tokens ever did.

---

## The honest version

The Mill is a *deliberately good* case for a loop — repetitive work with a real
test gate. Most production tasks aren't, and the sources below are blunt about
it: most developers don't need a loop yet. The skill you're learning is the
judgment to tell the difference. **Build the loop, stay the engineer.**

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
