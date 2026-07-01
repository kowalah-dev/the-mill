/**
 * /api/bookings/pending — bookings awaiting confirmation.
 *
 * GET /api/bookings/pending     All PENDING bookings, with guest and room
 *                               details, soonest check-in first.
 *
 * This is the entry point for the Advanced nightly confirmation job: fetch the
 * pending bookings here, decide whether each can be confirmed, then PATCH
 * /api/bookings/[id] to update its status.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const pending = await prisma.booking.findMany({
    where: { status: "PENDING" },
    include: { guest: true, room: true },
    orderBy: { checkIn: "asc" },
  });

  return NextResponse.json(pending);
}
