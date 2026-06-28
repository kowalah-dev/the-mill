# The course-coach artifacts — shared design

Each level (Beginner, Intermediate, Advanced) has a **coach artifact**: a single
published web page a participant keeps open beside Claude Code. It orients them in
the course, states the learning outcomes, lists the exercises with a progress bar,
and — when they click an exercise — hands them the exact prompt to run and the
"green check" that tells them they're done.

There's also a one-off **orientation matrix** (`reference/artifact-matrix-guide.md`
if you split it out) that opens the afternoon: *how you access Claude Code* ×
*where your code runs*.

This file is the **shared spec**. Each level's `artifact-guide.md` points here for
the look and behaviour, and supplies only its own content. To (re)generate a coach,
open the level's `artifact-guide.md` and run its prompt in a Claude Code session
**inside this repo** and **signed in with `/login`** (so it publishes to a URL).

> Every level prompt starts by telling Claude to **load the `artifact-design` skill**
> and follow this file. Keep that — it's what stops the output looking templated.

## What an artifact can and can't do (be honest in the room)

- ✅ It is a great **coach**: clicking an exercise reveals what to do and the exact
  **prompt to copy** into Claude Code (with a Copy button).
- ✅ It can **track progress** with self-marked checkmarks and a progress bar.
- ❌ It **cannot send messages into the Claude Code conversation** — a published
  artifact is a sandboxed page on claude.ai with no channel back to the session.
  "Drives the conversation" means *copy-paste the next prompt*, not auto-send.
- ❌ It **cannot detect** that someone finished an exercise. Progress is either
  **self-marked** (the default below) or **Claude-updated** (the session re-publishes
  the page with a box ticked — truer, but fragile across many machines).
- ✅ `localStorage` works in the artifact sandbox — progress survives a page reload
  (verified). It's per-browser, so a participant's ticks don't follow them to another
  device. The code still falls back to in-memory state without erroring if storage is
  ever unavailable.

## Structure every coach shares

1. **Header** — eyebrow `Claude for Technical Teams · Build Day`, then the level
   title (e.g. *Beginner — Configure & Document*).
2. **Course rail** (top-right) — `Beginner → Intermediate → Advanced`, current level
   lit, earlier levels marked done, later ones dimmed. This is the "where am I" cue.
3. **Outcomes banner** — *"By the end of this session you'll be able to…"* with the
   level's outcome statements.
4. **Checklist + progress bar** — the level's items as a list; a `done / total`
   counter and a bar that fills as items are marked.
5. **Detail panel** (clicking an item) — the *idea* (one line), the *Do*, the
   **prompt to try** in a dark "terminal" block with a **Copy** button, the
   **green check**, and a **Mark this done** toggle.
6. **Footer** — *"Stuck, or dropped in late? Run `/start-here`."*

Items may be flagged **reference** (e.g. Intermediate's "three verbs"): shown in the
list with a `REF` tag, excluded from the progress count, no prompt/check/mark.

## Visual system (schematic / blueprint)

- **Ground:** a picked cool/warm neutral with a faint engineering grid (two
  repeating-linear-gradients). Panels near-white; hairline borders.
- **Type:** system-font stack for body/headings (heavy weight, tight tracking on
  the h1); **monospace** for labels, file paths, slash-commands. Do **not** link a
  font CDN — it's blocked; a good system stack is fine.
- **Per-level accent:** Beginner **teal** (`#0E7C86`), Intermediate **amber**
  (`#B26B00`), Advanced **violet** (`#6D4AB8`), orientation matrix **steel-blue**.
  One accent per page; progress fill and checkmarks use it.
- **Prompt block:** a dark panel so the copy-target is unmistakable on a projector.
- **Avoid the generic AI-artifact looks** (cream+serif+terracotta, acid-green-on-black,
  purple→blue gradient hero, emoji section markers, everything centered).
- Self-contained (no external assets), keyboard-navigable, visible focus, respects
  `prefers-reduced-motion`, never scrolls sideways. Readable on a projector *and* a laptop.

## Optional: Claude-updated checkmarks (premium)

If you want true "you've done that one" persistence, the participant keeps the page
open and their session re-publishes the artifact (same file → same URL) with the
completed item pre-marked after each exercise. Drive it from the level prompt:
*"after I finish an exercise, update the artifact to show it done and re-publish."*
Default to self-marked; switch this on only for a small, well-supported room.
