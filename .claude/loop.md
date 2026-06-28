<!--
  Loop prompt for the Intermediate "development loop" exercise.

  In Claude Code, /loop and /goal are development-workflow tools: you keep the
  agent working until a verifiable condition holds — here, until the repo's
  it.todo edge-case tests are implemented and `npm test` is green. (A job that
  runs nightly and unattended, like confirming bookings, would be a Routine via
  /schedule — not a loop.)

  When you run a bare /loop (no prompt), Claude Code uses this file as the prompt
  for each iteration. A capped /goal is usually the better fit here:
      /goal every it.todo in __tests__ is implemented and npm test passes

  Suggested workflow to build:
    1. Read the it.todo edge cases in __tests__/bookings.test.ts (and rooms.test.ts).
    2. Pick the next unimplemented one and write it using your /write-test skill
       (follow the repo's test conventions; keep the suite re-runnable).
    3. Run `npm test`. If a test can't honestly pass because the API doesn't
       enforce the behaviour (e.g. double-booking), flag it — don't weaken the test.
    4. Append progress to STATE.md (which it.todos are done, which remain).
    5. Stop when every it.todo is implemented and the suite is green.
-->

# Drive the edge-case tests to green

(Replace this file's body with your development-loop workflow at the Intermediate level.)
