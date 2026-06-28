# Beginner — Configure & Document

At the Beginner level you'll leave with a configured tool, working prompts, and something you
built. Work through the exercises below at your own pace — your facilitator will
say which to focus on.

Each exercise points at something real in this repo. Nothing here is a toy.

> **Safety net — `/rewind`.** Experiment freely. Claude checkpoints your code
> before each prompt, so **`/rewind`** (or `Esc` twice on an empty prompt) rolls
> the files — or the conversation — back to any earlier point. One caveat that
> matters here: it only tracks Claude's *file edits*, not changes made by bash
> commands or API calls — so a `db:reset` or a booking written through the API
> won't rewind. For that, lean on Git and `npm run db:reset`.

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

## 2. Talk, don't type

You don't have to type your prompts. Claude Code on the desktop has **voice
input** — describe what you want out loud. It's often faster and more natural for
messy, exploratory asks, and it lowers the barrier to just *trying* something.

Pick a real question about this codebase. **Type it first.** Then press the
microphone and **say the same thing** — for example: *"Walk me through how a
booking moves through this app, from the API route to the database, and where its
status changes."* Notice which felt better, and when you'd reach for each.

## 3. Prompt like a builder — GPS

The skill here isn't coding — it's **describing**. **GPS** gives Claude the three
things it needs so it stops guessing:

- **Givens** — what's already true, and the patterns to reuse.
- **Problem** — the feature you want, in plain words.
- **Success** — how you'll know it's done.

Try it on a feature anyone can explain: *"we let guests book rooms; now let them
book a table at The Granary, the on-site restaurant."* Write it as GPS — Givens
(The Mill already books rooms, with statuses, a JSON API and a database; follow
those patterns), Problem (no way to reserve a table yet — add date, sitting and
party size), Success (I can create a reservation the same way and see it). Watch
how the Givens stop Claude inventing its own conventions.

**Tighter, verifiable variant:** `__tests__/bookings.test.ts` has edge cases left
as `it.todo`. Write a GPS prompt whose **Success** is "make this test pass," then
`npm test` and watch it go green. (The double-booking one is a deliberate trap —
the API doesn't prevent it; that's the bridge to the Advanced level.)

## 4. Build a skill

A skill is a **repeatable developer workflow** that lives in the project, not your
head — and you don't hand-write it. Describe what you want and let the
**skill-creator** scaffold the `SKILL.md`. Build a `/write-test` skill: *"Use the
skill-creator to build me a skill called write-test that finds an untested edge
case in this repo's API and writes a passing test for it — baking in our
conventions (tests live in `__tests__/`, run with Vitest against the seeded
`dev.db`, import the route handlers directly and use the `req()` helper, statuses
come from `lib/types.ts`, and tests stay re-runnable). It should list the
`it.todo` gaps, propose the best one, check whether the API enforces it, write the
test GPS-style, run `npm test`, and stay honest if it can't go green."*

Then invoke `/write-test`. **Make it yours:** swap in any workflow you'd actually
repeat (a `/seed-check`, a `/guest-summary`). See `.claude/skills/README.md` for
the `SKILL.md` format. (If `/skill-creator` isn't installed, Claude can scaffold
the skill from the same description; see
[`../reference/finding-skills.md`](../reference/finding-skills.md).)

## 5. Make an artifact

Ask Claude to build an **artifact** — a live web page it publishes to a private
URL on claude.ai that updates in place as the session continues. Two uses that
fit real work here (not a dashboard — the app already has those):

- **Compare UI approaches.** Pick a screen — the bookings list, or the
  room-detail page — and ask for three different layouts on one page, side by
  side, with a one-line tradeoff under each. Faster to decide from than prose.
- **Watch a change as it develops** (dev-focused). Ask Claude to keep an artifact
  showing the annotated diff of what it's editing and republish as it works, so
  you follow the change visually instead of scrolling the terminal.

Once it's published, try sharing it from the page header, asking Claude to update
it (each publish is a new version, and open viewers see it change in place), and
reopening the latest one with **`Ctrl+]`**.

> **If Claude writes a local HTML file instead of a link**, artifacts aren't
> enabled for your session. It's a beta feature that needs a **Team or Enterprise
> plan**, a session **signed in with `/login`** (not an API key, gateway token,
> or Bedrock/Vertex), and the Anthropic API — see the
> [artifacts docs](https://code.claude.com/docs/en/artifacts). If that's not you,
> open the HTML file Claude wrote in a browser; the page still works, you just
> can't publish or share it.

## 6. Document the check-out flow

`docs/checkout-flow.md` is a heading-only stub — the check-out flow is genuinely
undocumented. The move here is to make Claude the **interviewer**: it asks, you
decide. (Same technique whether the output is a handover doc or a build spec.)

You're new to The Mill, so let Claude propose answers you can confirm: *"Interview
me about how check-out **should** work — one question at a time. I'm new here, so
for anything I don't know, propose a sensible default based on how the rest of the
system already works (read the code), and I'll confirm or adjust. After about five
questions, write a structured doc to `docs/checkout-flow.md` covering the booking
status, the room status, and payment, in order."*

## 7. Connect a live system — MCP

MCP lets Claude read your live systems directly — a calendar, a database, GitHub,
Slack. The wishlist is the easy part; the lesson is seeing what changes when Claude
can actually *reach* one. Three steps:

1. **Explore** — run `/plugin` and `/mcp` to browse what's connectable, and
   shortlist two or three you'd genuinely use at work.
2. **Connect one** — the safe default your facilitator pre-tested, or one of your
   own systems if you have the credentials handy.
3. **Ask through it** — pose your first real question and watch Claude answer from
   the live system.

Before you point Claude at anything real, run the **three-question gate** — a live
connection means real data leaves to the model. No system to hand? The written
shortlist from step 1 is a fine place to stop.

---

See [`../reference/claude-code-features.md`](../reference/claude-code-features.md)
for the commands these exercises use, and try `/powerup` for guided lessons.
