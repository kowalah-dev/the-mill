---
name: start-here
description: Start here — orientation for the Kowalah T-series training at The Mill. Welcome, the scenario, what to try in your first five minutes, your level's exercises (T1/T2/T3), and where to find Claude Code features, skills and plugins. Run this first.
---

# Welcome to The Mill

You're working in **The Mill** — a booking system for a small retreat venue in
Northamptonshire, run by its proprietor, **Dom Kell**. This repo is your
training environment for the Kowalah **T-series** (Claude for Technical Teams).
You'll use it to learn **Claude Code** by doing real work on a real codebase.

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

1. **Get it running** (if you haven't):
   ```bash
   npm install
   npx prisma db push && npx prisma db seed
   npm run dev
   ```
   Open the URL it prints. Click around: Dashboard, Bookings, Rooms, Guests.

2. **Try `/powerup`** — Claude Code's built-in interactive lessons. A quick,
   hands-on tour of features you'll use today.

3. **Run `/init`** and compare what Claude generates to the `CLAUDE.md` already
   in this repo. That comparison is the first real lesson: what context does
   Claude discover on its own, and what does a human still need to add?

## Find your level

Open the guide for the course you're on — it lists the exercises and what each
one teaches you:

- **T1 — Configure & document:** [`t1/README.md`](t1/README.md)
- **T2 — Automate (loops, hooks, sub-agents):** [`t2/README.md`](t2/README.md)
- **T3 — Orchestrate & govern:** [`t3/README.md`](t3/README.md)

## Reference — where to find things

When you need to look something up, these are in [`reference/`](reference/):

- **[Claude Code features & commands](reference/claude-code-features.md)** —
  the built-in slash commands worth experimenting with (`/powerup`, `/init`,
  `/memory`, `/agents`, `/hooks`, `/loop`, …) and how to ask Claude how it works.
- **[Finding & installing skills](reference/finding-skills.md)** — where to
  discover skills (incl. **skills.sh**) and how to add one to this project.
- **[Plugins](reference/plugins.md)** — what plugins are and how to install one.

## A note on this skill

This `start-here` skill is your **course concierge** — it orients you and points
you around. The repo also ships one worked-example skill, **`/babysit`** (a
PR-shepherding loop — see [`reference/babysit-example.md`](reference/babysit-example.md)).
Everything else under `.claude/` (your own skills, sub-agents, rules) is **empty
on purpose** — building those is the training.
