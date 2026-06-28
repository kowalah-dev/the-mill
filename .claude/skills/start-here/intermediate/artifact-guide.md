# Intermediate coach artifact — generation guide

Builds the **Intermediate** coach: a 4-condition panel, then the three tiers
(Decide → Build → Harden) as a **sequential** checklist, plus a non-counted
"three verbs" reference card.

> **Concept note (read before editing).** In Claude Code, `/loop` and `/goal` are
> *developer-workflow* tools, scoped to your session — keep working until tests
> pass, babysit a PR, poll a build. A job that runs **nightly, unattended, inside
> the business** (like confirming bookings every night) is **not** a `/loop` — that's
> a **Routine** (`/schedule`), a standing cloud automation. This level teaches the
> session **dev loop**; the booking job appears only as the contrasting Routine
> example. Don't reintroduce "the nightly confirmation loop" as the exercise.

**How to use:** in a Claude Code session inside this repo, signed in with `/login`,
paste the prompt below. Shared look & behaviour: [`../reference/artifact-coach-design.md`](../reference/artifact-coach-design.md).

---

## Prompt

> Load the `artifact-design` skill, then build and publish an **Intermediate coach
> artifact** following `.claude/skills/start-here/reference/artifact-coach-design.md`
> exactly. Accent = **amber**. Course rail: **Intermediate** lit, Beginner marked
> done, Advanced ahead. Add a one-line note that the tiers build on each other —
> work top to bottom. Thread "build the loop, stay the engineer".
>
> Title: **Intermediate — Automate**.
>
> Outcomes ("By the end of this session you'll be able to"): tell a session loop
> (`/loop`, `/goal`) apart from a standing Routine (`/schedule`) · judge whether a
> task is even worth automating · run a **development** loop that drives work to a
> verified finish, gated by tests · harden a loop against the ways they fail unattended.
>
> **Between the outcomes banner and the progress checklist, add a compact panel —
> "What makes a loop worth it" — showing the 4-condition test as four labelled cells:**
> 1. **It repeats** — you'll run it more than once.
> 2. **Verification is automated** — a test/build/lint can fail the work while you're not watching.
> 3. **Budget absorbs the waste** — loops re-read, retry, explore.
> 4. **The agent has senior-engineer tools** — it can run the code and see what breaks.
> One line under them: *miss one, and keep it a manual prompt.*
>
> Three tiers (counted, sequential — each: idea / Do / prompt / green check):
>
> 1. **Decide: do you even need a loop?** Idea: most tasks don't need one — run the
>    4-condition test above. Then a second step: if it passes *and* it should run
>    unattended/recurring, that's a **Routine** (`/schedule`), not a session loop.
>    Worked contrast: "drive the `it.todo` edge-case tests to green" *passes* (and is a
>    session `/goal` — you're there, working); "redesign the booking schema" *fails*
>    (one-off judgment, no objective done). Prompt: "Score two tasks against the
>    4-condition test: (1) drive this repo's it.todo edge-case tests to green, (2)
>    redesign the booking schema. Verdict for each — then say which would be a session
>    /goal and which (if any) a scheduled Routine, and why." Check: you can say why
>    redesigning the schema fails, and which tool fits a task that passes.
> 2. **Build small: the minimum viable loop** (`automation · skill · state · gate`).
>    Idea: four parts — automation (`/goal` or `/loop`), skill (the `/write-test` skill
>    from Beginner), state file (`STATE.md`), gate (`npm test`). The loop does
>    **development** work: drive the `it.todo` backlog to green. Get one manual run
>    reliable first. Prompt: "Use /goal to drive this repo's it.todo edge-case tests to
>    green: keep working until every it.todo in __tests__/ is implemented (use the
>    write-test skill), npm test passes, and you've logged the run in STATE.md. If a
>    test can't honestly pass because the API doesn't enforce the behaviour, stop and
>    flag it rather than weakening the test." Check: the it.todo backlog shrinks, npm
>    test stays green, STATE.md logs the run — and the loop stops itself when the goal
>    holds (or flags the double-booking case it can't honestly pass — the bridge to Advanced).
> 3. **Harden: don't build a loop that hurts you** (`the failure modes`). Idea: a loop
>    runs while you're not watching — the **Ralph Wiggum loop** (quiet failure: what
>    objectively fails it? the suite, not an opinion), **maker ≠ checker** (split the
>    test-writer from a fresh verifier), the **security tax** (a loop that edits code and
>    runs commands unattended — what may it run, what needs your approval, is anything
>    irreversible like a push or `db:reset`?), goal drift, comprehension debt (read the
>    diffs). Prompt: "Add a verifier sub-agent in .claude/agents/ that reviews the tests
>    the loop wrote against the spec (different instructions from the writer) — or a
>    PostToolUse hook that runs npm test after edits under __tests__/ or app/api/."
>    Check: the hook fires, or your verifier catches a weak/wrong test the writer was
>    happy with.
>
> One **reference** item (flagged REF — not counted, no prompt/check/mark): **The three
> verbs** — Goal (`/goal <condition>`: work until verified true, then stop), Loop
> (`/loop <interval>`: repeat while you're *here*, on a timer), Routine (`/schedule`:
> run while you're *gone*, in the cloud). Note the trap: there is no `/routine` command.
> And the key contrast: **the nightly booking confirmation belongs here** — it's
> recurring and unattended, so it's a **Routine**, not a session loop.
>
> Publish it and give me the URL.
