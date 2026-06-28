# Orientation matrix artifact — generation guide

Builds the **opener** for the afternoon: an interactive matrix of the two dimensions
of working with Claude Code — *how you access it* × *where your code runs*. It also
doubles as a live demo of what an artifact is. Not a coach (no progress/checklist) —
just orientation.

**How to use:** in a Claude Code session signed in with `/login`, paste the prompt
below. Shares the schematic visual system in
[`artifact-coach-design.md`](artifact-coach-design.md) (accent = steel-blue here).

---

## Prompt

> Load the `artifact-design` skill, then build and publish an **interactive matrix
> artifact** teaching two dimensions of working with Claude Code. Use the schematic
> visual system from `.claude/skills/start-here/reference/artifact-coach-design.md`
> with a **steel-blue** accent. This is the opener for a hands-on course and a live
> demo of what an artifact is, so make it feel crafted.
>
> Title: **Where Claude Code runs, and how you reach it**.
>
> **Two axes:**
> - **How you access Claude Code:** Web, Desktop app, IDE (VS Code / JetBrains), Terminal.
> - **Where your code runs:** Locally (your machine) or in an Anthropic cloud
>   environment (spun up from the web).
>
> **Teaching points (the payoff when a cell/surface is clicked):**
> - Desktop, IDE and Terminal drive code running **locally** — full file access, but
>   your laptop must be on and awake.
> - The **Web** surface can spin up a **cloud environment** on Anthropic's
>   infrastructure: laptop closed, long jobs keep running, check in from your **phone**.
>   Trade-off: a remote sandbox, no local filesystem.
> - Highlight the **"you are here" cell for today: Desktop → running locally.**
> - One line per surface on what it's best for (Desktop = friendly/low-terminal; IDE =
>   live in your editor; Terminal = power users/scripting; Web = async/away/mobile).
> - One honest nuance: scheduled **Routines** (`/schedule`) always run in the cloud,
>   whichever surface launched them — the matrix is about the live, interactive session.
>
> **Interaction:** show the whole matrix at a glance; clicking a surface or a column
> reveals its detail without leaving the page; make the "today" cell obvious. Stay
> accurate — don't invent capabilities. Publish it and give me the URL.
