---
name: babysit
description: Auto-shepherd the current branch's PR to production. Monitors review comments (especially from review bots like the Claude GitHub app), addresses feedback with code changes, rebases when behind main, and diagnoses CI failures. Designed for /loop 5m /babysit continuous operation. Use when user says "babysit", "babysit this PR", "watch this PR", or wants automated PR maintenance on the current branch.
---

# PR Babysitter

Monitor the PR for the **current git branch**, address review comments, rebase
when behind `main`, and keep it moving toward merge. Optimised for running every
5 minutes via `/loop 5m /babysit`.

> This is a worked example of a **loop with a built-in stop condition** (see
> [`../start-here/reference/loop-examples.md`](../start-here/reference/loop-examples.md)).
> It's `/loop`-shaped — a check on a timer while you work — but it cancels its
> own schedule once the PR is clean, which makes it edge toward a `/goal`. It is
> repo-agnostic: it reads the project's own `package.json` scripts and works
> with any GitHub review bot. To try it here, push a branch and open a PR with
> `gh pr create`, then run `/loop 5m /babysit`.

## Workflow

Run steps in order. Keep output minimal — a single status line when nothing changed.

### 1. Find the PR for the current branch

```bash
gh pr view --json number,title,headRefName,state,reviewDecision 2>&1
```

If no PR exists for the current branch, output `No PR found for branch {branch}.` and stop.
If the PR is merged or closed, output `PR #{number} is already {state}.` and stop.

### 2. Check for new review feedback

Get the latest commit timestamp on the branch:
```bash
gh pr view --json commits --jq '.commits[-1].committedDate'
```

Check for review comments newer than the last commit:
```bash
gh api repos/{owner}/{repo}/pulls/{number}/comments --jq '[.[] | select(.created_at > "{last_commit_date}")] | length'
```

Check for review-bot comments on the issue (any commenter whose `user.type` is
`Bot` — e.g. the Claude GitHub app, Vercel Agent, or your CI):
```bash
gh api repos/{owner}/{repo}/issues/{number}/comments --jq '[.[] | select(.user.type == "Bot" and .created_at > "{last_commit_date}")] | length'
```

If no new comments since last commit, skip to step 3.

If new comments exist, read them in full, then **triage by severity**:

**Fix immediately (push a commit):**
- Items marked with bug emoji (🐛) or "Bug" heading — actual incorrect behavior
- Items marked with security emoji (🔒) or "Security" heading — vulnerabilities
- CI-breaking issues (type errors, test failures caused by the PR)

**Report but do NOT fix (log in summary output):**
- Code quality suggestions (duplication, naming, refactors)
- Performance suggestions
- Test coverage gaps
- UX suggestions
- Minor notes / style preferences
- Anything phrased as "consider", "suggest", "nice to have", "minor"

This distinction prevents infinite review loops — each push triggers a new bot review, and fixing suggestions endlessly would never converge.

**When fixing actionable bugs:**
1. Pull latest: `git pull --rebase`
2. Parse each bug comment — identify the file, line, and requested change
3. Make the code changes
4. Run the type check (look for a `typecheck` script in `package.json`, fall back to `npx tsc --noEmit`)
5. Run the tests (look for a `test:run` script, fall back to `npm test` — in this repo that runs `vitest run`)
6. If passing: commit with `fix: Address review feedback` and push
7. If failing: report the failure and do not push

**If the review contains only suggestions (no bugs/security), do not push.** Report the suggestions and stop — the human decides which to act on.

### 3. Check if branch is behind main

```bash
git fetch origin main
gh pr view --json mergeStateStatus --jq '.mergeStateStatus'
```

If `BEHIND`, rebase:
```bash
git rebase origin/main
git push --force-with-lease
```

If rebase has conflicts, abort (`git rebase --abort`) and report: `PR #{number} has merge conflicts — needs manual resolution.`

### 4. Check CI status

```bash
gh pr checks --json name,state --jq '.[] | select(.state != "SUCCESS" and .state != "PENDING")'
```

If checks are failing, read the logs and attempt a fix if it's a code issue (type error, lint, test). If it's infra/timeout, just report it.

### 5. Output summary

Status line, then any deferred suggestions:
```
PR #120 — no new comments, checks passing
PR #120 — fixed 2 bugs, pushed f257dde. 3 suggestions deferred (see below)
PR #120 — rebased on main
PR #120 — CI failing: type error in lib/foo.ts (fixed, pushed)
PR #120 — merge conflicts, needs manual resolution
PR #120 — approved, all checks green, ready to merge
PR #120 — new review, suggestions only (no bugs). No action taken.
```

When suggestions are deferred, list them briefly:
```
  Deferred suggestions:
  - #5 Code quality: extract shared progress utility
  - #8 UX: add hint text for disabled submit
  - #9 Test coverage: add API route tests
```

### 6. Auto-stop when done

After completing the summary, evaluate whether the babysit loop is still needed.
Stop it if ALL of the following are true:

- The latest review had **no bugs or security issues** (only suggestions or no new comments)
- All CI checks are passing (no `FAILURE` state)
- The branch is not behind main
- The PR is not in `CHANGES_REQUESTED` review state

In other words: if the last review cycle produced only deferred suggestions (or no comments at all) and CI is green, the babysitter's job is done — stop and report:
```
PR #120 — all bugs addressed, CI green. Babysit loop stopped.
```

If the PR is merged or closed, also stop.

**How to stop depends on how the loop was started:**

- **Fixed interval** (`/loop 5m /babysit`, the intended way) — the interval is a
  **session cron job**. Cancel it with `CronList` to find the babysit job ID,
  then `CronDelete` to remove it.
- **Self-paced** (bare `/loop /babysit`, no interval) — there's no cron job;
  the loop continues only because each turn schedules the next wake. To stop,
  simply **do not call `ScheduleWakeup`** (and cancel any `Monitor` you armed).

Either way, the principle is the same: a loop with no built-in stop condition
runs until you kill it — so this step is what keeps babysit from burning tokens
re-reviewing a green PR forever.

**Do NOT stop** if:
- You just pushed a fix (a new review cycle will follow)
- CI checks are still pending
- There are unresolved merge conflicts

## Rules

- Never auto-merge — only report merge readiness
- Be surgical — only change what comments ask for, no drive-by refactors
- If a comment is ambiguous or asks for a design decision, skip it: `Skipped comment on {file}:{line} — needs human judgement`
- Always run typecheck + tests before pushing
- Match existing commit message style from the repo
- On rebase conflicts, always abort the rebase and report
