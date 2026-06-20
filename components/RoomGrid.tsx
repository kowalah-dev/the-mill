/**
 * RoomGrid — a card per room. The left border colour encodes the room status:
 *   green = available, amber = reserved, red = occupied, grey = maintenance.
 */
import type { Room } from "@prisma/client";
import { StatusBadge } from "@/components/StatusBadge";
import { formatMoney } from "@/lib/format";

const BORDER_BY_STATUS: Record<string, string> = {
  AVAILABLE: "border-l-green-500",
  RESERVED: "border-l-amber-500",
  OCCUPIED: "border-l-red-500",
  MAINTENANCE: "border-l-gray-400",
};

export function RoomGrid({ rooms }: { rooms: Room[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`rounded-lg border border-l-4 border-gray-200 bg-white p-4 ${
            BORDER_BY_STATUS[room.status] ?? "border-l-gray-300"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-gray-900">Room {room.number}</p>
              <p className="text-sm text-gray-500">
                {room.type} · Floor {room.floor}
              </p>
            </div>
            <StatusBadge status={room.status} />
          </div>
          <p className="mt-2 text-sm text-gray-600">{room.description}</p>
          <p className="mt-3 text-sm font-medium text-gray-900">
            {formatMoney(room.pricePerNight)}
            <span className="font-normal text-gray-500"> / night</span>
          </p>
        </div>
      ))}
    </div>
  );
}
