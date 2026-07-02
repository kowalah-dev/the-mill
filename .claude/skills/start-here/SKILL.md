---
name: start-here
description: Start here — orientation for the Kowalah T1 course at The Mill. Welcome, the scenario, what to try in your first five minutes, your level's exercises (Beginner/Intermediate/Advanced), and where to find Claude Code features, skills and plugins. Run this first.
---

# Welcome to The Mill

You're working in **The Mill** — a booking system for a small retreat venue in
Somerset, run by its proprietor, **Dom Kell**. This repo is your
training environment for the **T1 course** in Kowalah's T-series (Claude for
Technical Teams). You'll use it to learn **Claude Code** by doing real work on a
real codebase, working up through three levels — Beginner, Intermediate, and
Advanced.

The point of today isn't the hotel. It's learning to **direct Claude** — to set
context, prompt well, build reusable tools, and automate. The Mill is just a
realistic, friendly place to practise.

## The scenario

Dom built The Mill by hand and runs it with almost no staff. He has no booking
system — it all lives in his head and a shared calendar. **You're the visiting
engineering team building one for him.** The system handles three workflows
everyone already understands:

1. **Booking** — a guest finds a free room and reserves it.
2. **Check-in** — a guest arrives; the room is assigned and marked occupied.
3. **Check-out** — a guest leaves; payment is settled and the room resets.

Some things in this repo are **deliberately unfinished** — missing tests, an
empty docs stub, empty `.claude/` folders. Those aren't bugs. **They're your
exercises.**

## Your first five minutes

1. **Get your environment set up and running** (if you haven't). This repo
   ships *without* a database — the SQLite file is generated from the schema and
   seed data, so the very first step is always: install dependencies, create the
   database, seed it, then start the server.

   **In Claude Desktop** — just ask: *"Let's get my environment set up and start
   a preview of the app."* Claude runs the setup for you (installs dependencies,
   creates and seeds the database), then spins up the dev server and gives you a
   live preview to click around in — no terminal needed.

   **In an IDE or terminal** — run it yourself:
   ```bash
   npm install
   npx prisma db push && npx prisma db seed   # creates + seeds the database
   npm run dev
   ```
   Then open the URL it prints.

   Either way, click around once it's up: Dashboard, Bookings, Rooms, Guests.

2. **Try `/powerup`** — Claude Code's built-in interactive lessons. A quick,
   hands-on tour of features you'll use today.

3. **Run `/init`** and compare what Claude generates to the `CLAUDE.md` already
   in this repo. That comparison is the first real lesson: what context does
   Claude discover on its own, and what does a human still need to add?

## Find your level

Open the guide for the level you're on — it lists the exercises and what each
one teaches you:

- **Beginner — Configure & document:** [`beginner/README.md`](beginner/README.md)
- **Intermediate — Automate (loops, hooks, sub-agents):** [`intermediate/README.md`](intermediate/README.md)
- **Advanced — Orchestrate & govern:** [`advanced/README.md`](advanced/README.md)

## Reference — where to find things

When you need to look something up, these are in [`reference/`](reference/):

**Commands & features**
- **[Claude Code features & commands](reference/claude-code-features.md)** —
  the built-in slash commands worth experimenting with (`/powerup`, `/init`,
  `/memory`, `/agents`, `/hooks`, `/loop`, `/rewind`, …) and how to ask Claude
  how it works.

**Skills & plugins**
- **[Finding & installing skills](reference/finding-skills.md)** — where to
  discover skills (incl. **skills.sh**) and how to add one to this project.
- **[Plugins](reference/plugins.md)** — what plugins bundle, the ones worth
  installing for The Mill, and how to share them with your team.

**Automation (Intermediate/Advanced)**
- **[Loop library](reference/loop-examples.md)** — copy-pasteable `/goal`,
  `/loop` and `/schedule` examples adapted to The Mill.
- **[The babysit loop](reference/babysit-example.md)** — a worked `/loop`
  example (the shipped `/babysit` PR-shepherd skill).
- **[Agents & dynamic workflows](reference/agents-and-workflows.md)** — the four
  ways to run agents in parallel: subagents, agent view, agent teams, dynamic
  workflows. *Advanced.*

**Governance & control (Advanced)**
- **[Hooks](reference/hooks.md)** — run commands automatically at lifecycle
  events to enforce rules deterministically.
- **[Permissions & settings](reference/permissions-and-settings.md)** — settings
  scopes, allow/ask/deny rules, and the permission modes.

## A note on this skill

This `start-here` skill is your **course concierge** — it orients you and points
you around. The repo also ships one worked-example skill, **`/babysit`** (a
PR-shepherding loop — see [`reference/babysit-example.md`](reference/babysit-example.md)).
Everything else under `.claude/` (your own skills, sub-agents, rules) is **empty
on purpose** — building those is the training.
