/**
 * Tests for the rooms API — happy path only (see bookings.test.ts for the note
 * on why edge cases are left as `it.todo`). Runs against the seeded dev.db.
 */
import { describe, it, expect } from "vitest";
import { GET as listRooms } from "@/app/api/rooms/route";
import { GET as listAvailable } from "@/app/api/rooms/available/route";

function req(url: string) {
  return new Request(`http://localhost${url}`);
}

describe("GET /api/rooms", () => {
  it("returns all 20 rooms", async () => {
    const res = await listRooms(req("/api/rooms"));
    const rooms = await res.json();

    expect(res.status).toBe(200);
    expect(rooms.length).toBe(20);
  });

  it("filters by status", async () => {
    const res = await listRooms(req("/api/rooms?status=MAINTENANCE"));
    const rooms = await res.json();

    expect(rooms.length).toBe(1);
    expect(rooms[0].status).toBe("MAINTENANCE");
  });
});

describe("GET /api/rooms/available", () => {
  it("requires both from and to", async () => {
    const res = await listAvailable(req("/api/rooms/available?from=2099-01-01"));
    expect(res.status).toBe(400);
  });

  it("never returns a room under maintenance", async () => {
    const res = await listAvailable(
      req("/api/rooms/available?from=2099-01-01&to=2099-01-05"),
    );
    const rooms = await res.json();

    expect(res.status).toBe(200);
    expect(rooms.length).toBeGreaterThan(0);
    expect(rooms.every((r: { status: string }) => r.status !== "MAINTENANCE")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Edge cases — NOT YET COVERED. Writing these is the exercise.
// ---------------------------------------------------------------------------
describe("edge cases (to be written)", () => {
  it.todo("excludes a room that already has an overlapping CONFIRMED booking");
  it.todo("includes a room whose only booking is CANCELLED");
  it.todo("returns 400 when 'to' is before 'from'");
});
