/**
 * Tests for the bookings API.
 *
 * These cover the HAPPY PATH only — the cases the system already handles. They
 * run against the seeded dev.db, so make sure you've run `npx prisma db seed`
 * first (the install steps do this).
 *
 * The edge cases at the bottom are deliberately left as `it.todo` — writing
 * them is a training exercise (Beginner M2 / Intermediate). The suite stays green so the Intermediate
 * confirmation loop has a passing gate to verify against.
 */
import { describe, it, expect } from "vitest";
import { GET as listBookings, POST as createBooking } from "@/app/api/bookings/route";
import { GET as listPending } from "@/app/api/bookings/pending/route";
import { PATCH, DELETE } from "@/app/api/bookings/[id]/route";

function req(url: string, init?: RequestInit) {
  return new Request(`http://localhost${url}`, init);
}

describe("GET /api/bookings", () => {
  it("returns every booking with its guest and room", async () => {
    const res = await listBookings(req("/api/bookings"));
    const bookings = await res.json();

    expect(res.status).toBe(200);
    expect(bookings.length).toBe(30);
    expect(bookings[0].guest).toBeTruthy();
    expect(bookings[0].room).toBeTruthy();
  });

  it("filters by status", async () => {
    const res = await listBookings(req("/api/bookings?status=CONFIRMED"));
    const bookings = await res.json();

    expect(bookings.length).toBe(8);
    expect(bookings.every((b: { status: string }) => b.status === "CONFIRMED")).toBe(true);
  });
});

describe("GET /api/bookings/pending", () => {
  it("returns only pending bookings, with guest and room details", async () => {
    const res = await listPending();
    const pending = await res.json();

    expect(pending.length).toBe(5);
    expect(pending.every((b: { status: string }) => b.status === "PENDING")).toBe(true);
    expect(pending[0].guest.name).toBeTruthy();
    expect(pending[0].room.number).toBeTruthy();
  });
});

describe("POST /api/bookings", () => {
  it("creates a booking and computes the total from the room price", async () => {
    const body = {
      guestId: 1,
      roomId: 18, // Mill Suite — £280/night
      checkIn: "2099-01-01",
      checkOut: "2099-01-04", // 3 nights
    };
    const res = await createBooking(
      req("/api/bookings", { method: "POST", body: JSON.stringify(body) }),
    );
    const booking = await res.json();

    expect(res.status).toBe(201);
    expect(booking.status).toBe("PENDING");
    expect(booking.totalAmount).toBe(840); // 280 * 3

    // Clean up so the suite stays repeatable.
    await DELETE(req(`/api/bookings/${booking.id}`), {
      params: Promise.resolve({ id: String(booking.id) }),
    });
  });

  it("returns 400 (not 500) when roomId is not a number", async () => {
    const res = await createBooking(
      req("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          guestId: 1,
          roomId: "abc",
          checkIn: "2099-01-01",
          checkOut: "2099-01-02",
        }),
      }),
    );

    expect(res.status).toBe(400);
  });

  it("returns 404 when the guest does not exist", async () => {
    const res = await createBooking(
      req("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          guestId: 999999,
          roomId: 18,
          checkIn: "2099-01-01",
          checkOut: "2099-01-02",
        }),
      }),
    );

    expect(res.status).toBe(404);
  });
});

describe("PATCH /api/bookings/[id]", () => {
  it("confirms a pending booking and restores it afterwards", async () => {
    const pending = await (await listPending()).json();
    const target = pending[0];

    const confirmed = await (
      await PATCH(
        req(`/api/bookings/${target.id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "CONFIRMED" }),
        }),
        { params: Promise.resolve({ id: String(target.id) }) },
      )
    ).json();

    expect(confirmed.status).toBe("CONFIRMED");

    // Restore to PENDING so re-running the suite is deterministic.
    await PATCH(
      req(`/api/bookings/${target.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "PENDING" }),
      }),
      { params: Promise.resolve({ id: String(target.id) }) },
    );
  });
});

// ---------------------------------------------------------------------------
// Edge cases — NOT YET COVERED. Writing these is the exercise.
// ---------------------------------------------------------------------------
describe("edge cases (to be written)", () => {
  it.todo("rejects a booking whose check-out is before its check-in");
  it.todo("rejects a booking with a check-in date in the past");
  it.todo("rejects double-booking a room for overlapping dates");
  it.todo("rejects a booking against a room under maintenance");
  it.todo("rejects an invalid status on PATCH with a 400");
});
