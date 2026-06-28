# Beginner coach artifact — generation guide

Builds the **Beginner** coach: a published page that orients participants, states the
outcomes, and walks them through the six exercises (plus a voice warm-up) with a
progress bar and copy-paste prompts.

**How to use:** in a Claude Code session inside this repo, signed in with `/login`,
paste the prompt below. See [`../reference/artifact-coach-design.md`](../reference/artifact-coach-design.md)
for the shared look, behaviour, and the honest limits of artifacts.

---

## Prompt

> Load the `artifact-design` skill, then build and publish a **Beginner coach
> artifact** following `.claude/skills/start-here/reference/artifact-coach-design.md`
> exactly (course rail, outcomes banner, checklist + progress bar, click-to-detail
> with a copy-able prompt and a green check, self-marked progress with an in-memory
> fallback). Accent = **teal**. Course rail: **Beginner** lit, Intermediate/Advanced
> ahead.
>
> Title: **Beginner — Configure & Document**.
>
> Outcomes ("By the end of this session you'll be able to"): give Claude project
> context that loads itself · drive Claude by **voice**, not just typing · structure a
> prompt with GPS so it stops guessing · build a reusable skill and publish an
> artifact · turn what's in someone's head into documentation · connect Claude to a
> live system with MCP.
>
> The seven items (each: idea / Do / prompt to try / green check):
>
> 1. **Context is everything** (`CLAUDE.md · /init`). Idea: Claude is only as good as
>    the context it loads; `CLAUDE.md` is its onboarding doc, read every session. Do:
>    run `/init`, compare to the committed `CLAUDE.md`, add one fact it missed.
>    Prompt: "Run /init in this repo, then open the committed CLAUDE.md and tell me
>    what it knows that /init didn't discover — and why Claude couldn't infer it."
>    Check: you can point to a line `/init` would never have guessed (the SQLite
>    string-enum rule).
> 2. **Talk, don't type** (`voice input · desktop`) — VOICE warm-up, framed "say this
>    out loud", not "copy". Idea: Claude Code on desktop has voice input — describe
>    what you want aloud; often faster for messy asks. Do: take a real question, type
>    it, then use the microphone to say the same thing; notice which felt better.
>    Prompt (spoken): "Press the microphone and say — Walk me through how a booking
>    moves through this app, from the API route to the database, and where its status
>    changes." Check: you've driven Claude by voice once and have a feel for when to
>    reach for it.
> 3. **Prompt like a builder (GPS)** (`Givens · Problem · Success`). Idea: GPS turns a
>    feature you can describe in plain English into a prompt Claude can act on without
>    guessing — the skill is describing, not coding. Do: describe a new feature in three
>    parts — try adding **table bookings for The Granary** (the on-site restaurant).
>    Prompt: "Givens: The Mill already has a booking system — guests book rooms, each
>    booking has a status, there's a JSON API and a database; follow the patterns already
>    there. Problem: guests can book a room but can't reserve a table at our restaurant,
>    The Granary; I want table reservations with a date, a sitting (lunch or dinner) and a
>    party size. Success: I can create a reservation the same way room bookings are made,
>    it reuses existing patterns, and I can see it once made." Check: you described the
>    feature in three parts and Claude built the right thing without stopping to guess.
>    (Tighter, verifiable variant for developers: ask Claude to make one of the failing
>    `it.todo` tests in `__tests__/bookings.test.ts` pass — Success = `npm test` green.)
> 4. **Build a skill** (`skill-creator · .claude/skills/`). Idea: a good skill is a
>    repeatable developer workflow that captures project context — and you scaffold it
>    with the **skill-creator**, not by hand. Do: use the skill-creator to build a
>    `/write-test` skill. Prompt: "Use the skill-creator to build me a skill called
>    write-test. Its job: find an untested edge case in this repo's API and write a
>    passing test for it. Bake in our conventions so it doesn't re-derive them: tests
>    live in __tests__/ and run with Vitest against the seeded dev.db; they import route
>    handlers directly and use a local req() helper; status values come from the string
>    unions in lib/types.ts; tests must stay re-runnable. Steps: list the it.todo gaps
>    and propose the best one; check whether the API enforces it; write the test
>    GPS-style; run npm test; if it can't pass honestly, say so rather than weakening
>    it." Check: you invoke `/write-test` and it proposes a gap, writes a test and runs
>    npm test — without hand-writing the SKILL.md. (No skill-creator installed? Claude
>    scaffolds it from the same description; see `../reference/finding-skills.md`.)
> 5. **Make an artifact** (`a live published page`). Note this guide is itself an
>    artifact. Prompt: "Build me a published artifact showing three different layouts
>    for the bookings list side by side, with a one-line trade-off under each." Check:
>    a shareable URL (needs `/login`).
> 6. **Document the check-out flow** (`interview · decide · docs/`). Idea: make Claude
>    the interviewer — it asks, you decide; same move whether the output is a handover
>    doc or a build spec. The flow is undocumented, so learners decide it rather than
>    recall it. Prompt: "Interview me about how check-out should work at The Mill — one
>    question at a time. I'm new here, so for anything I don't know, propose a sensible
>    default based on how the rest of the system already works (read the code), and I'll
>    confirm or adjust. After about five questions, write a structured doc to
>    docs/checkout-flow.md covering the booking status, the room status and payment, in
>    order." Check: docs/checkout-flow.md is filled in with an ordered flow the learner
>    confirmed. (SHOW it with the facilitator playing Dom and giving real answers; the
>    propose-and-confirm wording keeps the room unstuck, since they don't know The Mill.)
> 7. **Connect a live system (MCP)** (`/mcp · /plugin`). Idea: MCP lets Claude read
>    your live systems directly — the wishlist is the easy 10%; the lesson is seeing
>    what changes when Claude can actually reach one (the course's "Opening the Doors"),
>    and it's where the three-question data-gate gets real. Do (three steps): **explore**
>    what's connectable via `/plugin` and `/mcp`, shortlist 2–3 you'd use at work;
>    **connect one** — the room's safe default (facilitator pre-tests it) or your own
>    system if you have credentials handy; then **ask through it**. Prompt: "Help me
>    connect an MCP so you can read [the system I care about]. Walk me through /mcp or
>    the right plugin in /plugin, then once it's connected, ask it: [my first real
>    question]." Check: Claude answers using data from a system it couldn't reach five
>    minutes ago, and `/mcp` shows it connected. (No system to hand, or a locked-down
>    laptop? Fall back to a written shortlist — nobody's blocked.) Stay server-agnostic:
>    the facilitator picks and pre-tests a safe default (an OAuth connector is far
>    smoother for a room than a local server needing npx + API keys).
>
> Publish it and give me the URL.
