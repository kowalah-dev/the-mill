# T1 — Configure & Document

In T1 you'll leave with a configured tool, working prompts, and something you
built. Work through the exercises below at your own pace — your facilitator will
say which to focus on.

Each exercise points at something real in this repo. Nothing here is a toy.

## 1. Context is everything — `CLAUDE.md`

Run `/init` in this repo and let Claude generate a `CLAUDE.md`. Then open the
`CLAUDE.md` that's **already committed** and compare them.

- What did `/init` discover on its own?
- What did the committed file add that Claude couldn't infer (the SQLite
  string-enum gotcha, the "current focus areas", the "what not to do")?
- Ask Claude a question about the codebase **before** and **after** good context
  is loaded, and notice the difference.

**Stretch:** add a path-scoped rule in `.claude/rules/` (see its README) — e.g.
Prisma conventions that load only when you edit `prisma/`.

## 2. Prompt like a builder — GPS

`__tests__/bookings.test.ts` and `rooms.test.ts` have edge cases left as
`it.todo` (double-booking, past check-in dates, maintenance rooms). Pick one and
use the **GPS** framing to get Claude to implement it:

- **Givens** — the conventions Claude needs (string enums via `lib/types.ts`,
  `Float` money, the API in `app/api/`).
- **Problem** — the specific behaviour that isn't handled yet.
- **Success** — what a passing test looks like.

The happy-path suite is green (`npm test`), so you get a tight loop: write one
real edge-case test, watch it pass.

## 3. Build a skill

Create your own skill in `.claude/skills/` — for example `/confirm-booking`,
a reusable workflow that reads a booking and confirms it through the API. See
`.claude/skills/README.md` for the `SKILL.md` format. (This `start-here` skill
is an example you can crib from.)

## 4. Make an artifact

Ask Claude to build an **artifact** — a live, shareable page — from this repo.
Good candidates: a "this week's arrivals" dashboard, or a walkthrough of a change
you just made. This is the artifacts feature in a context that matches your work.

## 5. Document the check-out flow

`docs/checkout-flow.md` is a heading-only stub — the check-out flow is genuinely
undocumented. Use the **interview-extraction** prompt: *"Interview me about how
check-out works, five questions one at a time, then produce a structured doc."*
Capture what happens to the booking status, the room status, and payment, and in
what order. File the result in `docs/checkout-flow.md`.

## 6. MCP wishlist

What would you connect The Mill to if Claude could read it directly — a real
database, a calendar, Slack? Write a short wishlist: for each, what it is and the
first question you'd ask Claude once it's connected. (Connecting one live is T3.)

---

See [`../reference/claude-code-features.md`](../reference/claude-code-features.md)
for the commands these exercises use, and try `/powerup` for guided lessons.
