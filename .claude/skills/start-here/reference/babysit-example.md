# Worked example: the `/babysit` loop

This repo ships a real, runnable skill — [`/babysit`](../../babysit/SKILL.md) —
as a study sample for the T2 loop-engineering exercise. It's the clearest
real-world example of the `/loop` pattern: a check on a timer, with a verifier
inside it and a stop condition built in.

## What it demonstrates

| Loop ingredient | How babysit does it |
|-----------------|---------------------|
| **Cadence** | `/loop 5m /babysit` — re-runs every 5 minutes while your session is open |
| **The work** | reads new PR review comments, fixes the *actionable* ones (bugs, security, CI breaks) |
| **The verifier** | runs `npx tsc --noEmit` and `npm test` (→ `vitest run`) **before** every push — never ships red |
| **Anti-spin** | triages suggestions vs. bugs so it doesn't fix-forever (each push triggers a fresh review) |
| **Stop condition** | once the PR is clean and CI is green, it cancels its own loop |

That last row is the interesting bit: it's `/loop`-shaped but self-terminating,
so it sits halfway between a loop ("while I'm here") and a goal ("until it's
done"). A loop with a real stop condition is almost always the right loop.

**How a `/loop` stops — worth knowing.** `/loop` has two modes, and babysit's
self-stop respects both:

- **Fixed interval** (`/loop 5m /babysit`) — the `5m` is registered as a
  *session-scoped cron job*. To stop it from inside, you cancel that job
  (`CronList` to find the ID, `CronDelete` to remove it). This is the same
  `Cron*` family that cloud `/schedule` routines use — the only difference is the
  job lives in the session, not in durable `.claude/scheduled_tasks.json`.
- **Self-paced** (bare `/loop /babysit`, no interval) — there's no cron job; the
  loop only continues because each turn schedules its own next wake. To stop, you
  simply don't schedule it again.

Either way the lesson is the same: **a loop runs until something stops it.** Build
the stop condition in, or it re-reviews a green PR forever.

## Why it's a good general example

Despite originating in another project, the skill is **repo-agnostic** — there's
nothing project-specific in it. It discovers the project's own `package.json`
scripts (falling back to `npx tsc --noEmit` and `npm test`), and it treats any
GitHub commenter whose `user.type` is `Bot` as a review bot, so it works with the
Claude GitHub app, Vercel Agent, or your own CI regardless of repo.

## Try it here

The Mill is a public GitHub repo (`kowalah-dev/the-mill`), so babysit works the
moment there's a PR to watch:

```bash
git checkout -b fix/some-change
# ...make a small change...
git commit -am "fix: a small change"
git push -u origin fix/some-change
gh pr create --fill
/loop 5m /babysit
```

Then watch it: leave a review comment on the PR (or let a review bot do it) and
the next tick will read it, triage it, and either fix-and-push or defer it with a
one-line reason. When the PR goes green, the loop stops itself.

### Where the review comments come from

Babysit acts on PR review comments, so you need something posting them. From
least to most setup:

1. **You, or `/code-review --comment`** — leave a review comment by hand, or run
   `/code-review --comment` in a Claude Code session to post findings onto the PR.
   Zero GitHub setup; enough to exercise the loop.
2. **The Claude GitHub app** (`@claude` mentions) — run `/install-github-app` in
   Claude Code (you must be a repo admin), or follow the
   [GitHub Actions docs](https://code.claude.com/docs/en/github-actions).
3. **Claude Code Review** — automatic inline review on every PR, no trigger
   needed: [setup docs](https://code.claude.com/docs/en/code-review). This is the
   ideal feed for babysit, but it's a research-preview Team/Enterprise feature an
   admin enables for the org — so it may not be available on a personal repo.

## Make it your own

Two natural extensions for the T2 "harden" tier:

- **Budget it.** Loops cost tokens on every tick. Add an explicit cap — e.g. stop
  after N ticks with no new comments — on top of the existing self-cancel.
- **Split maker from checker.** Babysit currently both fixes and verifies (via
  `npm test`). Define a separate verifier sub-agent in `.claude/agents/` that
  reviews babysit's fix against the original comment before it pushes.
