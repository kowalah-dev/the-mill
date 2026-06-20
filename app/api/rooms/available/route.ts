/**
 * /api/rooms/available — rooms free for a date range.
 *
 * GET /api/rooms/available?from=2026-07-01&to=2026-07-05
 *
 * Returns rooms that are not under maintenance and have no active booking
 * (PENDING, CONFIRMED or CHECKED_IN) overlapping the requested range.
 * Two ranges overlap when existing.checkIn < to AND existing.checkOut > from.
 *
 * `from` and `to` are required ISO date strings (YYYY-MM-DD).
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const from = params.get("from");
  const to = params.get("to");

  if (!from || !to) {
    return NextResponse.json(
      { error: "Both 'from' and 'to' query parameters are required." },
      { status: 400 },
    );
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return NextResponse.json(
      { error: "'from' and 'to' must be valid dates." },
      { status: 400 },
    );
  }

  const available = await prisma.room.findMany({
    where: {
      status: { not: "MAINTENANCE" },
      bookings: {
        none: {
          status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
          checkIn: { lt: toDate },
          checkOut: { gt: fromDate },
        },
      },
    },
    orderBy: { number: "asc" },
  });

  return NextResponse.json(available);
}
