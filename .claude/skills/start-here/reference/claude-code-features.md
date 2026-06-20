# Claude Code features & commands

The commands worth experimenting with during the course. Type `/` in a Claude
Code session to see what's available; these are the ones that matter most here.

## Start with these

| Command | What it does |
|---------|--------------|
| `/powerup` | **Discover Claude Code features through quick interactive lessons.** Animated, in-terminal demos of context, hooks, MCP, sub-agents and `/loop`. The best first thing to run. |
| `/init` | Analyses the codebase and generates a `CLAUDE.md`. Run it here and compare to the committed one (T1 exercise 1). |
| `/help` | Lists the commands available in your session. |

## Configuration & context

| Command | What it does |
|---------|--------------|
| `/memory` | View and edit the `CLAUDE.md` files loaded into context, and manage Claude's auto-memory. |
| `/config` | Open settings, or set an individual setting directly. |
| `/model` | Switch the model. |
| `/fast` | Toggle fast mode. |
| `/clear` | Start a fresh conversation with empty context. |
| `/compact` | Summarise the conversation to free up context. |

## Automation (T2/T3)

| Command | What it does |
|---------|--------------|
| `/loop` | Run a prompt repeatedly on a **cadence** — fixed (`/loop 30m <prompt>`) or self-paced (`/loop`, where Claude picks the interval, 1m–1h). For polling and repeated checks. |
| `/goal` | Keep working **until a condition you wrote is verified true** (`/goal all pending bookings are confirmed and npm test passes`). After each turn, a separate small model (defaults to Haiku) judges whether the condition holds — so the agent doing the work isn't the one grading it. For substantial work with a measurable end state. |
| `/agents` | Create and manage sub-agents (`.claude/agents/`). |
| `/hooks` | View the hooks configured for tool events (`.claude/settings.json`). |
| `/mcp` | Manage MCP server connections. |
| `/permissions` | Manage tool-access rules. |
| `/plugin` | Find, install and manage plugins (see [plugins.md](plugins.md)). |

**`/loop` vs `/goal`:** reach for `/loop` when you want a check *on a timer*
regardless of state (polling a deploy, babysitting a PR); reach for `/goal` when
there's a crisp, verifiable finish line and you want hands-off work *until it's
proven done*. The nightly confirmation loop can use either — `/loop` for a
recurring nightly run, `/goal` to drain the pending queue in one sitting.

**Where automations run** (covered in `/powerup`): session-scoped `/loop` (needs
the session open; expires after 7 days), **Desktop scheduled tasks** (run on your
machine while it's awake), and **Routines** (run in the cloud on Anthropic's
infrastructure — no machine needed, but no local file access and a 1-hour minimum).

## Working on code

| Command | What it does |
|---------|--------------|
| `/plan` | Enter plan mode for a larger change — Claude researches and proposes before editing. |
| `/diff` | Interactive viewer for uncommitted changes. |
| `/review` | Review a pull request locally in the current session. |
| `/code-review` | Review your diff for bugs and cleanups (can apply fixes). |
| `/debug` | Turn on debug logging to troubleshoot. |

## Asking Claude how Claude Code works

You don't have to memorise any of this. You can ask Claude directly — *"how do
hooks work?"*, *"what goes in a sub-agent file?"* — and it will explain. The full
reference lives at **code.claude.com/docs**, and `/powerup` walks you through the
big features hands-on.

> Command availability tracks the Claude Code version, so the exact set can
> shift between releases. If something here isn't in your `/` menu, your version
> differs — check `code.claude.com/docs`.
