/**
 * /api/rooms — the room list.
 *
 * GET /api/rooms                List all rooms, ordered by room number.
 *                               Optional ?status=AVAILABLE (etc.) to filter.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ROOM_STATUSES, isRoomStatus } from "@/lib/types";

export async function GET(request: Request) {
  const status = new URL(request.url).searchParams.get("status");
  if (status !== null && !isRoomStatus(status)) {
    return NextResponse.json(
      {
        error: `Invalid status: ${status}. Expected one of ${ROOM_STATUSES.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  const rooms = await prisma.room.findMany({
    where: status ? { status } : undefined,
    orderBy: { number: "asc" },
  });

  return NextResponse.json(rooms);
}
