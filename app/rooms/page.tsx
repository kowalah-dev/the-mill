/**
 * Rooms — a grid of every room, colour-coded by status (see RoomGrid).
 */
import { prisma } from "@/lib/db";
import { RoomGrid } from "@/components/RoomGrid";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({ orderBy: { number: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <p className="text-sm text-gray-500">{rooms.length} rooms</p>
      </div>
      <RoomGrid rooms={rooms} />
    </div>
  );
}
