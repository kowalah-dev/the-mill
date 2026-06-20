# The Mill — Booking System

## What this codebase is

A hotel booking engine for The Mill, a retreat venue in Northamptonshire run by
its proprietor, Dom Kell. Guests can browse rooms, make bookings, check in, and
check out. This repo is the training environment for Kowalah's T-series
(Claude for Technical Teams) — participants extend and automate it across T1,
T2, and T3.

If a participant is new or unsure where to begin, point them at the
`/start-here` skill — it's the course concierge (welcome, the scenario, what to
try first, and the T1/T2/T3 exercise guides).

## Stack

- Next.js 16 (App Router), TypeScript, React 19
- SQLite database via Prisma ORM (v6)
- Tailwind CSS v4 + shadcn/ui for the UI
- Vitest for tests

> Next.js 16 has breaking changes vs. older versions in your training data
> (e.g. dynamic route `params` and page `searchParams` are now Promises and
> must be awaited). If something looks off, check `node_modules/next/dist/docs/`
> before writing code.

## Running locally

```
npm install
npx prisma db push      # create the SQLite database from the schema
npx prisma db seed      # populate 20 rooms, 15 guests, 30 bookings
npm run dev
```

App runs at http://localhost:3000. No environment variables required — the
SQLite file lives at `prisma/dev.db`.

## Database

Prisma client singleton is in `lib/db.ts`. Schema is in `prisma/schema.prisma`.
Seed data is in `prisma/seed.ts` (dates are computed relative to now, so the
dashboard always shows live-looking arrivals).

To reset and reseed: `npm run db:reset` (= `prisma db push --force-reset && prisma db seed`).

Two SQLite specifics to know:

- **No native enums.** `Room.type`, `Room.status`, and `Booking.status` are
  stored as `String`. The allowed values live as union types in `lib/types.ts`
  (`RoomType`, `RoomStatus`, `BookingStatus`) — import and use those, don't type
  raw string literals.
- **Money is `Float`.** `pricePerNight` and `totalAmount` are floats for clean
  JSON and simple test assertions.

## Key conventions

- All database access goes through Prisma (`lib/db.ts`) — no raw SQL.
- Pages are React Server Components that query Prisma directly. The `app/api/`
  routes exist for **programmatic** access (loops, agents, scripts) and return
  clean, predictable JSON.
- Booking status: `PENDING | CONFIRMED | CHECKED_IN | CHECKED_OUT | CANCELLED`.
- Room status: `AVAILABLE | OCCUPIED | MAINTENANCE | RESERVED`.
- Shared display helpers (dates, money) are in `lib/format.ts`.

## Current focus areas (as at T1 pilot, June 2026)

- The nightly confirmation loop (T2): read `PENDING` bookings from
  `GET /api/bookings/pending`, confirm or flag each via `PATCH /api/bookings/[id]`,
  and record the run in `STATE.md`. Verify against the test suite.
- Documentation: the check-in and check-out flows are undocumented
  (`docs/checkout-flow.md` is a stub).
- Tests: `__tests__/bookings.test.ts` and `rooms.test.ts` cover the happy path
  only — the edge cases (double-booking, past check-in, maintenance rooms) are
  left as `it.todo` for participants to write.

## What not to do

- Do not add external API dependencies without checking with the facilitator.
- Do not change the seed data schema without updating `prisma/seed.ts`.
- Do not connect a cloud database — SQLite only for training use.
- Do not "fix" the intentional gaps (missing edge-case tests, the stub docs,
  the empty `.claude/agents/` and `.claude/rules/`) — they are the exercises.
  (`.claude/skills/` holds the `start-here` course guide; building your *own*
  skill is still the T1 exercise.)
