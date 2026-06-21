# A loop library for The Mill

Copy-pasteable examples of the three automation commands, adapted to this repo.
Treat this as a menu, not a to-do list — most tasks don't need any of these (see
the 4-condition test in [`../t2/README.md`](../t2/README.md)). Reach for one only
when the work repeats, the check is automated, and you can afford to step away.

## First, get the three verbs right

Almost everyone muddles these. The clean split:

| Verb | One-line | Command | Runs while… |
|------|----------|---------|-------------|
| **Goal** | keep working **until the outcome is achieved**, then stop | `/goal <condition>` | …until a verified condition holds |
| **Loop** | keep repeating a task **while I'm here** | `/loop <interval> <prompt>` | …your session is open |
| **Routine** | keep working **while I'm gone** | `/schedule <description>` | …in the cloud, laptop closed |

The trap: **there is no `/routine` command.** The "while I'm gone" cloud
scheduler is `/schedule`; its runs are called **Routines**. Get the verb right
and every example below just works.

`/goal` is the one with a built-in judge: after each turn a separate small model
(defaults to Haiku) checks whether your condition is actually true — so the agent
doing the work isn't the one grading it. `/loop` is a dumb timer by comparison,
which is exactly what you want for polling. See the side-by-side in
[`claude-code-features.md`](claude-code-features.md).

## Examples, by verb

Each is adapted from a real loop people are running (credited), retargeted at The
Mill's booking domain and test gate (`npm test` → `vitest run`).

### `/loop` — while you're here

**Build-test-fix** (after raycfu's most-demoed pair) — the everyday workhorse:
```
/loop build the next item on the plan, then run npm test, npx tsc --noEmit, and
npm run lint. Feed every failure back as the next instruction and fix it. Stop
when the build is green and there's nothing left to report.
```

**The 5-minute maintainer** (after Peter Steinberger) — one small verified
upkeep per tick while you work on something else:
```
/loop 5m make one small verified improvement — a flaky test, a stale comment, a
missing type imported from lib/types.ts. One change, one commit, tests green.
Never touch prisma/schema.prisma or the seed data.
```

**Babysit a PR** (the shipped `/babysit` skill in this repo) — shepherd the
current branch's PR toward merge: read review-bot comments, fix the real bugs,
rebase when behind `main`, report the rest:
```
/loop 5m /babysit
```
This one is a loop that *stops itself* — once the PR is clean it cancels its own
schedule, which makes it edge toward a goal. See
[`babysit-example.md`](babysit-example.md) for how it's built and how to try it
here (push a branch, open a PR with `gh pr create`, then run the loop).

### `/goal` — until it's proven done

**Drain the pending queue, capped** (after qbuilder's bounded plan-verify-fix) —
the nightly confirmation job as a one-sitting goal with a hard cap so it can't
run away:
```
/goal every PENDING booking is either CONFIRMED or flagged with a reason, and
npm test passes. Append a run summary to STATE.md each pass. Max 5 iterations —
stop at the first clean pass or when the cap is hit, and tell me which.
```

**The quality streak** (after Matthew Berman) — for when "it works once" isn't
enough, because the seed data and dates shift between runs:
```
/goal run npm test against the seeded booking scenarios. Fix whatever fails,
then run again. A new failure resets the count. Done only after 5 consecutive
clean passes.
```

### `/schedule` — while you're gone

**The guest-email triage** (after the r/LangChain hotel-email agent — the one
example in the source piece that's literally The Mill's world) — classify and
draft, escalate the rest, never act irreversibly:
```
/schedule every 15 minutes, classify new guest enquiries and draft a reply for
the routine ones (availability, directions, check-in times). Queue anything
about refunds or booking changes for a human. Log every decision. Never
auto-send a refund or change a booking.
```
Routines run in the cloud with no local file access and a 1-hour minimum cadence
in practice — so this is a sketch of the shape, not something to leave running
against the training DB.

## The two warnings the hype skips

Both came back on every platform in the source article, and both are already
baked into the T2 "harden" tier:

> *"a loop is a money fire with a verifier on top."*

So **every goal gets a cap and every loop gets a budget**. Notice every example
above has a stop condition — `Max 5 iterations`, `5 consecutive clean passes`,
self-cancelling babysit. Set the ceiling before you walk away, not after the
bill arrives.

> *"a loop that can't actually tell good output from bad just automates being
> wrong, faster. Writing the loop is easy. The verifier inside it is the hard
> part."* — @ahmetbilicanxyz

This is why `/goal` runs a separate judge, why this repo gates on `npm test`
(objective) rather than an agent's opinion, and why the T2 exercise splits the
maker from the checker. An agent grading its own homework will delete the
failing test and call it done.

---

**Build the loop, stay the engineer.** Pick one example, give it a budget and a
real check, and watch what it does before you trust it unattended.
