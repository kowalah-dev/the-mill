/**
 * Tests for the guests API — GET plus input validation on POST.
 *
 * The POST validation cases below are all rejected *before* any write, so they
 * create no rows and the suite stays re-runnable against the seeded dev.db (run
 * `npx prisma db seed` first, as the install steps do).
 */
import { describe, it, expect } from "vitest";
import { GET as listGuests, POST as createGuest } from "@/app/api/guests/route";

function req(url: string, init?: RequestInit) {
  return new Request(`http://localhost${url}`, init);
}

function post(body: unknown) {
  return createGuest(
    req("/api/guests", { method: "POST", body: JSON.stringify(body) }),
  );
}

describe("GET /api/guests", () => {
  it("returns guests, alphabetically by name", async () => {
    const res = await listGuests();
    const guests = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(guests)).toBe(true);
    expect(guests.length).toBeGreaterThan(0);
    const names = guests.map((g: { name: string }) => g.name);
    expect(names).toEqual([...names].sort());
  });
});

describe("POST /api/guests validation", () => {
  it("rejects a missing name or email with 400", async () => {
    expect((await post({ email: "x@example.com" })).status).toBe(400);
    expect((await post({ name: "Ada Lovelace" })).status).toBe(400);
  });

  it("rejects non-string name/email with 400 (not a 500)", async () => {
    expect((await post({ name: 123, email: "x@example.com" })).status).toBe(400);
    expect((await post({ name: "Ada", email: 456 })).status).toBe(400);
  });

  it("rejects a whitespace-only name or email with 400", async () => {
    expect((await post({ name: "   ", email: "x@example.com" })).status).toBe(400);
    expect((await post({ name: "Ada", email: "   " })).status).toBe(400);
  });

  it("rejects a non-string phone with 400", async () => {
    const res = await post({ name: "Ada", email: "ada@example.com", phone: 12345 });
    expect(res.status).toBe(400);
  });
});
