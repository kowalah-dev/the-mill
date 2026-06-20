/**
 * /api/rooms — the room list.
 *
 * GET /api/rooms                List all rooms, ordered by room number.
 *                               Optional ?status=AVAILABLE (etc.) to filter.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const status = new URL(request.url).searchParams.get("status");

  const rooms = await prisma.room.findMany({
    where: status ? { status } : undefined,
    orderBy: { number: "asc" },
  });

  return NextResponse.json(rooms);
}
