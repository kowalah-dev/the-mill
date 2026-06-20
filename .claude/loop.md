<!--
  Loop prompt for the T2 "nightly confirmation" exercise.

  When you run a bare `/loop` (no prompt), Claude Code uses the contents of this
  file as the prompt for each iteration. Replace the placeholder below with your
  workflow during the exercise.

  Suggested workflow to build:
    1. Fetch pending bookings from GET /api/bookings/pending.
    2. For each, decide whether it can be confirmed (e.g. the room is free for
       the dates — see GET /api/rooms/available).
    3. Confirm it via PATCH /api/bookings/[id] { "status": "CONFIRMED" }, or
       flag the ones that can't be confirmed.
    4. Append a summary of this run to STATE.md (timestamp, how many confirmed,
       how many flagged and why).
    5. Run `npm test` and only report success if the suite passes.
-->

# Nightly booking confirmation

(Replace this file's body with your confirmation workflow during T2.)
