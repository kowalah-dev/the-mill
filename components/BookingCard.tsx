/**
 * BookingCard — a compact summary of one booking, used on the dashboard's
 * "Today's Arrivals" panel. Links through to the booking detail page.
 */
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, formatMoney } from "@/lib/format";

type BookingWithRelations = Prisma.BookingGetPayload<{
  include: { guest: true; room: true };
}>;

export function BookingCard({ booking }: { booking: BookingWithRelations }) {
  return (
    <Link
      href={`/bookings/${booking.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-gray-900">{booking.guest.name}</p>
          <p className="text-sm text-gray-500">
            Room {booking.room.number} · {booking.room.type}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <span>
          {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
        </span>
        <span className="font-medium text-gray-900">
          {formatMoney(booking.totalAmount)}
        </span>
      </div>
    </Link>
  );
}
