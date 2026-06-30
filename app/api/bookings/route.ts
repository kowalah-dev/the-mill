/**
 * /api/bookings — the booking collection.
 *
 * GET  /api/bookings            List all bookings, newest check-in first.
 *                               Optional ?status=PENDING (etc.) to filter.
 *                               Each booking includes its guest and room.
 * POST /api/bookings            Create a booking.
 *                               Body: { guestId, roomId, checkIn, checkOut, notes? }
 *                               Status defaults to PENDING; totalAmount is
 *                               computed from the room's nightly price.
 *
 * All access goes through Prisma (lib/db.ts) — no raw SQL.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { BOOKING_STATUSES, isBookingStatus } from "@/lib/types";

export async function GET(request: Request) {
  const status = new URL(request.url).searchParams.get("status");
  if (status !== null && !isBookingStatus(status)) {
    return NextResponse.json(
      {
        error: `Invalid status: ${status}. Expected one of ${BOOKING_STATUSES.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  const bookings = await prisma.booking.findMany({
    where: status ? { status } : undefined,
    include: { guest: true, room: true },
    orderBy: { checkIn: "asc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { guestId, roomId, checkIn, checkOut, notes, status } = body;
  if (guestId == null || roomId == null || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "guestId, roomId, checkIn and checkOut are required." },
      { status: 400 },
    );
  }

  const room = await prisma.room.findUnique({ where: { id: Number(roomId) } });
  if (!room) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const nights = Math.max(
    1,
    Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000),
  );

  const booking = await prisma.booking.create({
    data: {
      guestId: Number(guestId),
      roomId: Number(roomId),
      checkIn: inDate,
      checkOut: outDate,
      status: isBookingStatus(status) ? status : "PENDING",
      totalAmount: room.pricePerNight * nights,
      notes: notes ?? null,
    },
    include: { guest: true, room: true },
  });

  return NextResponse.json(booking, { status: 201 });
}
