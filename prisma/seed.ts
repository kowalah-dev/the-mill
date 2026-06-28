/**
 * Seed data for The Mill.
 *
 * Run with `npx prisma db seed` (configured in package.json -> prisma.seed).
 * Safe to re-run: it clears the three tables first, then repopulates.
 *
 * Dates are computed relative to *now* at seed time, so the dashboard always
 * looks live — three bookings arrive "today", several over the next week, and
 * a handful are currently in-house — no matter when the repo is cloned.
 *
 * Counts (per the training brief):
 *   20 rooms   — 10 single, 7 double, 3 suite
 *   15 guests
 *   30 bookings — 8 CONFIRMED (3 arriving today), 5 PENDING, 8 CHECKED_IN,
 *                 7 CHECKED_OUT, 2 CANCELLED
 */
import { PrismaClient } from "@prisma/client";
import type { BookingStatus, RoomStatus, RoomType } from "../lib/types";

const prisma = new PrismaClient();

/** Midnight today, local time — the anchor for every relative date below. */
function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const T = today();

type RoomSeed = {
  id: number;
  number: string;
  type: RoomType;
  floor: number;
  status: RoomStatus;
  pricePerNight: number;
  description: string;
};

const rooms: RoomSeed[] = [
  // 10 singles — floors 1 and 2
  { id: 1, number: "101", type: "SINGLE", floor: 1, status: "AVAILABLE", pricePerNight: 85, description: "Snug ground-floor single facing the courtyard." },
  { id: 2, number: "102", type: "SINGLE", floor: 1, status: "AVAILABLE", pricePerNight: 85, description: "Quiet single beside the old grain store." },
  { id: 3, number: "103", type: "SINGLE", floor: 1, status: "OCCUPIED", pricePerNight: 90, description: "South-facing single with a writing desk." },
  { id: 4, number: "104", type: "SINGLE", floor: 1, status: "AVAILABLE", pricePerNight: 90, description: "Single overlooking the kitchen garden." },
  { id: 5, number: "105", type: "SINGLE", floor: 1, status: "MAINTENANCE", pricePerNight: 90, description: "Single under the eaves — radiator awaiting repair." },
  { id: 6, number: "106", type: "SINGLE", floor: 2, status: "AVAILABLE", pricePerNight: 95, description: "Bright first-floor single with beamed ceiling." },
  { id: 7, number: "107", type: "SINGLE", floor: 2, status: "AVAILABLE", pricePerNight: 95, description: "Single with a glimpse of the millpond." },
  { id: 8, number: "108", type: "SINGLE", floor: 2, status: "OCCUPIED", pricePerNight: 95, description: "Cosy single tucked above the wheel house." },
  { id: 9, number: "109", type: "SINGLE", floor: 2, status: "AVAILABLE", pricePerNight: 100, description: "Single with original sluice-gate ironwork on display." },
  { id: 10, number: "110", type: "SINGLE", floor: 2, status: "RESERVED", pricePerNight: 100, description: "Corner single, two windows, held for an arrival." },

  // 7 doubles — floors 2 and 3
  { id: 11, number: "201", type: "DOUBLE", floor: 2, status: "AVAILABLE", pricePerNight: 145, description: "Double with a cast-iron bedstead and river view." },
  { id: 12, number: "202", type: "DOUBLE", floor: 2, status: "OCCUPIED", pricePerNight: 150, description: "Double over the leat, soft sound of moving water." },
  { id: 13, number: "203", type: "DOUBLE", floor: 2, status: "AVAILABLE", pricePerNight: 150, description: "Double with a deep window seat above the weir." },
  { id: 14, number: "204", type: "DOUBLE", floor: 3, status: "AVAILABLE", pricePerNight: 160, description: "Top-floor double, sloping ceilings, exposed timbers." },
  { id: 15, number: "205", type: "DOUBLE", floor: 3, status: "RESERVED", pricePerNight: 165, description: "Double with a roll-top bath and millpond outlook." },
  { id: 16, number: "206", type: "DOUBLE", floor: 3, status: "AVAILABLE", pricePerNight: 165, description: "Double facing the orchard, very quiet." },
  { id: 17, number: "207", type: "DOUBLE", floor: 3, status: "OCCUPIED", pricePerNight: 170, description: "Generous double with a small reading nook." },

  // 3 suites — floor 3
  { id: 18, number: "Mill Suite", type: "SUITE", floor: 3, status: "AVAILABLE", pricePerNight: 280, description: "The original miller's quarters — beams, fireplace, and the best view of the wheel." },
  { id: 19, number: "Granary Suite", type: "SUITE", floor: 3, status: "AVAILABLE", pricePerNight: 300, description: "Double-height suite in the converted granary loft." },
  { id: 20, number: "Weir Suite", type: "SUITE", floor: 3, status: "AVAILABLE", pricePerNight: 340, description: "Largest suite, private terrace overlooking the weir pool." },
];

const guests = [
  { id: 1, name: "Eleanor Whitfield", email: "eleanor.whitfield@example.com", phone: "+44 7700 900111" },
  { id: 2, name: "Tomás Reyes", email: "tomas.reyes@example.com", phone: "+44 7700 900112" },
  { id: 3, name: "Priya Nair", email: "priya.nair@example.com", phone: null },
  { id: 4, name: "James Okonkwo", email: "james.okonkwo@example.com", phone: "+44 7700 900114" },
  { id: 5, name: "Sofia Lindqvist", email: "sofia.lindqvist@example.com", phone: "+44 7700 900115" },
  { id: 6, name: "Hassan Al-Amin", email: "hassan.alamin@example.com", phone: null },
  { id: 7, name: "Grace Donnelly", email: "grace.donnelly@example.com", phone: "+44 7700 900117" },
  { id: 8, name: "Mateusz Kowalski", email: "mateusz.kowalski@example.com", phone: "+44 7700 900118" },
  { id: 9, name: "Aiko Tanaka", email: "aiko.tanaka@example.com", phone: "+44 7700 900119" },
  { id: 10, name: "Daniel Mercer", email: "daniel.mercer@example.com", phone: null },
  { id: 11, name: "Yara Haddad", email: "yara.haddad@example.com", phone: "+44 7700 900121" },
  { id: 12, name: "Callum Fraser", email: "callum.fraser@example.com", phone: "+44 7700 900122" },
  { id: 13, name: "Beatriz Costa", email: "beatriz.costa@example.com", phone: "+44 7700 900123" },
  { id: 14, name: "Noah Bergström", email: "noah.bergstrom@example.com", phone: null },
  { id: 15, name: "Ingrid Møller", email: "ingrid.moller@example.com", phone: "+44 7700 900125" },
];

const priceOf = (roomId: number) =>
  rooms.find((r) => r.id === roomId)!.pricePerNight;

const nights = (a: Date, b: Date) =>
  Math.max(1, Math.round((b.getTime() - a.getTime()) / 86_400_000));

type BookingSeed = {
  guestId: number;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  notes?: string;
};

const bookingPlans: BookingSeed[] = [
  // 8 CONFIRMED arriving in the next 7 days — first 3 arrive TODAY
  { guestId: 1, roomId: 18, checkIn: T, checkOut: addDays(T, 3), status: "CONFIRMED", notes: "Anniversary stay — flowers requested." },
  { guestId: 2, roomId: 11, checkIn: T, checkOut: addDays(T, 2), status: "CONFIRMED" },
  { guestId: 3, roomId: 6, checkIn: T, checkOut: addDays(T, 1), status: "CONFIRMED", notes: "Late arrival, after 9pm." },
  { guestId: 4, roomId: 13, checkIn: addDays(T, 1), checkOut: addDays(T, 4), status: "CONFIRMED" },
  { guestId: 5, roomId: 19, checkIn: addDays(T, 2), checkOut: addDays(T, 5), status: "CONFIRMED", notes: "Travelling with a small dog." },
  { guestId: 6, roomId: 1, checkIn: addDays(T, 3), checkOut: addDays(T, 5), status: "CONFIRMED" },
  { guestId: 7, roomId: 16, checkIn: addDays(T, 5), checkOut: addDays(T, 8), status: "CONFIRMED" },
  { guestId: 8, roomId: 4, checkIn: addDays(T, 6), checkOut: addDays(T, 7), status: "CONFIRMED" },

  // 5 PENDING — not yet confirmed. These are the input for the Intermediate nightly loop.
  { guestId: 9, roomId: 20, checkIn: addDays(T, 2), checkOut: addDays(T, 4), status: "PENDING" },
  { guestId: 10, roomId: 2, checkIn: addDays(T, 4), checkOut: addDays(T, 6), status: "PENDING", notes: "Awaiting card details." },
  { guestId: 11, roomId: 14, checkIn: addDays(T, 7), checkOut: addDays(T, 10), status: "PENDING" },
  { guestId: 12, roomId: 9, checkIn: addDays(T, 8), checkOut: addDays(T, 9), status: "PENDING" },
  { guestId: 13, roomId: 17, checkIn: addDays(T, 9), checkOut: addDays(T, 12), status: "PENDING", notes: "Group booking — second room may follow." },

  // 8 CHECKED_IN — currently in-house (arrived in the last few days)
  { guestId: 14, roomId: 3, checkIn: addDays(T, -2), checkOut: addDays(T, 1), status: "CHECKED_IN" },
  { guestId: 15, roomId: 8, checkIn: addDays(T, -1), checkOut: addDays(T, 2), status: "CHECKED_IN" },
  { guestId: 1, roomId: 12, checkIn: addDays(T, -3), checkOut: addDays(T, 1), status: "CHECKED_IN", notes: "Extended by one night." },
  { guestId: 2, roomId: 7, checkIn: addDays(T, -1), checkOut: addDays(T, 3), status: "CHECKED_IN" },
  { guestId: 3, roomId: 10, checkIn: addDays(T, -2), checkOut: addDays(T, 2), status: "CHECKED_IN" },
  { guestId: 4, roomId: 15, checkIn: addDays(T, -4), checkOut: addDays(T, 1), status: "CHECKED_IN" },
  { guestId: 5, roomId: 5, checkIn: addDays(T, -1), checkOut: addDays(T, 4), status: "CHECKED_IN" },
  { guestId: 6, roomId: 11, checkIn: addDays(T, -2), checkOut: addDays(T, 1), status: "CHECKED_IN" },

  // 7 CHECKED_OUT — historical
  { guestId: 7, roomId: 1, checkIn: addDays(T, -10), checkOut: addDays(T, -7), status: "CHECKED_OUT" },
  { guestId: 8, roomId: 18, checkIn: addDays(T, -14), checkOut: addDays(T, -11), status: "CHECKED_OUT" },
  { guestId: 9, roomId: 13, checkIn: addDays(T, -9), checkOut: addDays(T, -8), status: "CHECKED_OUT" },
  { guestId: 10, roomId: 6, checkIn: addDays(T, -21), checkOut: addDays(T, -18), status: "CHECKED_OUT" },
  { guestId: 11, roomId: 19, checkIn: addDays(T, -6), checkOut: addDays(T, -4), status: "CHECKED_OUT" },
  { guestId: 12, roomId: 2, checkIn: addDays(T, -30), checkOut: addDays(T, -28), status: "CHECKED_OUT" },
  { guestId: 13, roomId: 16, checkIn: addDays(T, -5), checkOut: addDays(T, -2), status: "CHECKED_OUT" },

  // 2 CANCELLED
  { guestId: 14, roomId: 20, checkIn: addDays(T, 4), checkOut: addDays(T, 7), status: "CANCELLED", notes: "Guest cancelled — change of plans." },
  { guestId: 15, roomId: 14, checkIn: addDays(T, -3), checkOut: addDays(T, -1), status: "CANCELLED", notes: "No-show, released." },
];

async function main() {
  // Clear in dependency order so the seed is safely re-runnable.
  await prisma.booking.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.room.deleteMany();

  await prisma.room.createMany({ data: rooms });
  await prisma.guest.createMany({ data: guests });

  await prisma.booking.createMany({
    data: bookingPlans.map((b) => ({
      guestId: b.guestId,
      roomId: b.roomId,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      status: b.status,
      notes: b.notes ?? null,
      totalAmount: priceOf(b.roomId) * nights(b.checkIn, b.checkOut),
    })),
  });

  const [roomCount, guestCount, bookingCount] = await Promise.all([
    prisma.room.count(),
    prisma.guest.count(),
    prisma.booking.count(),
  ]);

  console.log(
    `Seeded The Mill: ${roomCount} rooms, ${guestCount} guests, ${bookingCount} bookings.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
