# Advanced coach artifact — generation guide

Builds the **Advanced** coach: four frontier topics, centred on **dynamic
workflows** ("build the harness, not the prompt"). Feature-led — it deliberately
pushes Claude Code's most advanced capabilities and doesn't force everything back
onto the booking scenario.

> **Concept note.** The spine of this level is one question — **who holds the
> plan?** Subagents and agent teams → Claude, turn by turn. **Dynamic workflows →
> a script** (deterministic, readable, re-runnable). Background sessions / worktrees
> → you. The frontier move is writing the *harness*, not another prompt.
>
> **Availability (say it in the room):** dynamic workflows need a paid plan with
> API access and are opted into per run; **agent teams** are experimental (env flag);
> **Routines** are research preview. The course runs these hands-on, so each DO
> carries a one-line "if it's not enabled…" fallback.

**How to use:** in a Claude Code session inside this repo, signed in with `/login`,
paste the prompt below. Shared look & behaviour: [`../reference/artifact-coach-design.md`](../reference/artifact-coach-design.md).
The orchestration map lives in [`../reference/agents-and-workflows.md`](../reference/agents-and-workflows.md).

---

## Prompt

> Load the `artifact-design` skill, then build and publish an **Advanced coach
> artifact** following `.claude/skills/start-here/reference/artifact-coach-design.md`
> exactly. Accent = **violet**. Course rail: **Advanced** lit, Beginner and
> Intermediate marked done. Intro line: *you're not writing prompts now — you're
> writing the orchestration.*
>
> Title: **Advanced — Orchestrate & Govern**.
>
> Outcomes ("By the end of this session you'll be able to"): move the plan out of
> the conversation into a **harness** you can read and rerun · pick the right
> orchestration shape for the work (who holds the plan?) · govern a fleet of agents
> — permissions, isolation, judgment-gate hooks · ship work unattended as a Routine
> and package it as a plugin.
>
> Four topics (counted — each: idea / Do / prompt / green check). Where a feature is
> gated, end the Do with a short "if it's not enabled…" note:
>
> 1. **Dynamic workflows — build the harness, not the prompt** (`/workflows`). Idea:
>    the frontier move — stop coordinating sub-agents by prompt and write a *harness*,
>    a script that fans them out, cross-checks their findings, and synthesises a
>    result. The plan lives in code you can read, iterate and rerun — not in one
>    conversation's memory. Shape: fan-out → verify → synthesise, with a budget. Do:
>    run a workflow over the codebase, watch it in `/workflows`, then save it as a
>    reusable command and rerun. Prompt: "Author and run a dynamic workflow that audits
>    every route in app/api/ in parallel — one agent per route looking for missing
>    input validation and unhandled status transitions — then a verification pass that
>    filters false positives, and a synthesis of the real findings. Show me the harness,
>    run it, and save it as a reusable command." Check: a workflow fanned out across the
>    API, cross-checked its own findings, and you saved the harness to rerun. *(Needs a
>    paid plan with API access; opt in per run. Not enabled? Watch the facilitator's run
>    and read the saved harness script together.)*
> 2. **The orchestration menu — who holds the plan?** (`subagents · teams · workflows · worktrees`).
>    Idea: five ways to run agents, one question to choose between them — who holds the
>    plan? Subagents and **agent teams** → Claude, turn by turn; **workflows** → a
>    script; **background sessions** and **worktrees** → you. Match the shape to the
>    work. Do: spin up an **agent team** to investigate from three angles at once and
>    watch them self-claim tasks and message each other. Prompt: "Spawn an agent team to
>    review this codebase from three angles in parallel — security, performance, and
>    test coverage — each teammate claiming its angle, then compare findings and surface
>    the disagreements." Check: three teammates worked in parallel and reconciled their
>    findings — coordination you didn't micromanage. *(Agent teams are experimental — set
>    `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Not enabled? Run the same three angles as
>    three subagents instead.)*
> 3. **Govern the fleet** (`permissions · isolation · judgment hooks`). Idea: parallel
>    and unattended raises the stakes. Scope each agent's `tools` and `permissionMode`;
>    run risky work in `isolation: worktree`; add a **judgment hook** — a hook that
>    spawns a sub-agent (or asks Claude) "is this good?" and blocks until yes. Plus the
>    production failure modes: idempotency (run it twice?), double-booking, maintenance
>    mid-stay — decide which the *code* prevents and which an *agent* catches. Do: add a
>    judgment hook that gates risky work, and scope one agent to a worktree with limited
>    tools. Prompt: "Add a hook that, before any git push, spawns a sub-agent to check
>    the change against our conventions and blocks if it fails — and scope a sub-agent to
>    run in isolation: worktree with a minimal tool set." Check: a hook gated an action
>    on a sub-agent's judgment, and one agent runs sandboxed with scoped tools.
> 4. **Ship it unattended — Routines & plugins** (`/schedule · plugin`). Idea: make what
>    you built durable. A **Routine** (`/schedule`) runs it unattended in the cloud —
>    laptop off — on a schedule, an API call, or a GitHub event. (This is where Dom's
>    nightly booking confirmation finally belongs — recurring and unattended.) Then
>    **package** your skills, agents, hooks and workflows as a plugin so the whole squad
>    gets them in one install. Do: schedule a Routine for a recurring job, and package
>    today's work as a plugin. Prompt: "Create a Routine that runs nightly to confirm
>    Dom's pending bookings and open a summary — walk me through /schedule. Then package
>    my skills, sub-agents, hooks and workflows into a plugin my team can install in one
>    step." Check: a Routine is scheduled to run unattended, and your work is bundled as
>    a one-install plugin. *(Routines are research preview. Not available? Design the
>    Routine on paper — trigger, prompt, permissions — and still build the plugin.)*
>
> Publish it and give me the URL.
