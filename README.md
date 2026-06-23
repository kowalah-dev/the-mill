# The Mill — Booking System

A lightweight hotel booking engine for **The Mill**, a retreat venue in
Somerset run by its proprietor, Dom Kell. This repository is the
training environment for **Kowalah's T-series** (Claude for Technical Teams).
You'll work in it to learn **Claude Code** at progressively deeper levels
(T1 → T2 → T3).

> **Two ways to follow this guide:**
> - **Newer to development?** Use the **Claude Code Desktop** app and let Claude
>   run the setup for you — you barely need a terminal. Follow the steps below;
>   where a command appears, you can simply ask Claude to do it.
> - **Comfortable in a terminal or VS Code?** The commands are all here — clone,
>   install, run. Skip straight to the code blocks.

---

## Before you begin

You need three things installed once. Each links to a simple installer:

1. **Node.js** (version 20 or newer) — the runtime the app uses.
   Download the "LTS" version from <https://nodejs.org>.
2. **Git** — to download the code. <https://git-scm.com/downloads>
   (Or skip Git entirely — see Step 1.)
3. **Claude Code** — the tool you're here to learn.
   Get the desktop app or the terminal install from
   <https://claude.com/claude-code>.

> Not sure if you have Node or Git already? Open Claude Code (Step 2) and ask:
> *"Do I have Node.js and Git installed, and what versions?"* — it'll check for you.

---

## Step 1 — Get the code onto your computer

Pick the path that matches what you'll do. Most of the course (T1, and the local
T2 loop) runs entirely on your machine — **you only need your own GitHub copy if
you want to open pull requests** and try the `/babysit` exercise.

**A. Just exploring, or doing T1 / the local T2 loop** — clone or download:

```bash
git clone https://github.com/kowalah-dev/the-mill
cd the-mill
```

*Without Git (simplest for first-timers):* on the GitHub page, click the green
**Code** button → **Download ZIP**, then unzip it somewhere you'll find again
(e.g. your Documents folder).

**B. Want to open PRs and try `/babysit`** — make your *own* copy first:

1. On the [repo page](https://github.com/kowalah-dev/the-mill), click
   **Use this template → Create a new repository**. This gives you an
   independent repo you fully own (cleaner than a fork — `gh pr create` targets
   *your* repo by default, and you can add a review bot to it).
2. Clone *your* new repo:
   ```bash
   git clone https://github.com/<your-username>/the-mill
   cd the-mill
   ```
3. **Give `/babysit` something to read.** It acts on PR *review comments*, so it
   needs comments on the PR. Three ways, simplest first:
   - **No setup** — leave a review comment yourself, or run **`/code-review --comment`**
     in a Claude Code session to post findings straight onto your PR.
   - **The Claude GitHub app** (`@claude` mentions) — run **`/install-github-app`**
     in Claude Code, or follow the
     [GitHub Actions setup docs](https://code.claude.com/docs/en/github-actions).
     You must be a repo admin.
   - **Automatic review on every PR** — Claude Code Review
     ([setup docs](https://code.claude.com/docs/en/code-review)) posts inline
     findings without a trigger. Best experience, but it's a Team/Enterprise
     feature an admin enables for the org, so it may not be available on a
     personal repo.

   Without any comments to act on, `/babysit` still runs — it just reports that
   there's nothing to do.

> Prefer to **fork** instead? That works too, but `gh pr create` from a fork
> defaults to opening the PR against *this* upstream repo — run
> `gh repo set-default <your-fork>` first so your PRs land on your own copy, and
> install the review bot on the fork.

---

## Step 2 — Open it in Claude Code

Pick whichever matches how you like to work:

- **Claude Code Desktop** (great if you're newer): open the app, choose
  **Open Project** (or **Open Folder**), and select the `the-mill` folder.
- **Terminal**: `cd` into the `the-mill` folder and run `claude`.
- **VS Code / JetBrains**: open the `the-mill` folder, then open the Claude Code
  panel/extension.

All three give you the same Claude Code — the difference is just where it lives.

---

## Step 3 — Set up and run the app

You can run these four commands yourself in the terminal:

```bash
npm install                          # install dependencies
npx prisma db push && npx prisma db seed   # create and fill the database
npm run dev                          # start the app
```

**Or just ask Claude to do it.** In your Claude Code session, type:

> *"Set this project up and start it: install dependencies, set up the database,
> and run the dev server."*

Either way, the app starts and prints a local URL (usually
<http://localhost:3000>). Open it in your browser — you'll see the dashboard,
bookings, rooms and guests, already full of sample data. No accounts, no API
keys, no `.env` file: the database is a single SQLite file at `prisma/dev.db`.

---

## Step 4 — Run `/start-here`

In Claude Code, type **`/start-here`**. It's your course concierge — a welcome,
the scenario, what to try in your first five minutes, and the exercise guide for
your level (T1, T2 or T3). Start there.

---

## What's in here

| Path | What it is |
|------|------------|
| `app/` | Dashboard, bookings, rooms and guests pages (React Server Components) |
| `app/api/` | JSON API — the programmatic entry points for loops and agents |
| `prisma/` | `schema.prisma` (data model) and `seed.ts` (20 rooms, 15 guests, 30 bookings) |
| `lib/` | Prisma client (`db.ts`), shared types (`types.ts`), formatters (`format.ts`) |
| `components/` | UI components, including shadcn/ui primitives in `components/ui/` |
| `__tests__/` | Vitest suite — the verification gate for the T2 loop |
| `CLAUDE.md` | Pre-built project context — read it as a worked example in T1 |
| `.claude/skills/start-here/` | **Run `/start-here` first** — the course concierge and T1/T2/T3 exercise guides |
| `.claude/skills/babysit/` | A worked-example `/loop` skill (PR shepherd) — study it for T2; see `start-here/reference/babysit-example.md` |
| `.claude/` | `agents/` and `rules/` are empty, ready for exercises; `loop.md` scaffolds the T2 loop |
| `docs/` | `checkout-flow.md` — a stub you'll fill in during T1 |
| `STATE.md` | Loop state, written by the T2 nightly confirmation loop |

## Common commands

```bash
npm run dev        # start the app
npm test           # run the Vitest suite
npm run db:reset   # wipe and reseed the database
npm run build      # production build
```

(Don't remember these? Just ask Claude — *"how do I reset the database?"*)

## The three workflows the system models

1. **Booking** — a guest searches availability, picks a room, makes a reservation.
2. **Check-in** — a guest arrives, the room is assigned, status updates to occupied.
3. **Check-out** — a guest leaves, payment is finalised, the room resets.

## Note for participants

Some things in this repo are intentionally incomplete — missing edge-case tests,
a stub `docs/checkout-flow.md`, empty `.claude/agents/` and `.claude/rules/`.
**These are the exercises**, not bugs. Run `/start-here` (or your facilitator
will tell you which to tackle).
