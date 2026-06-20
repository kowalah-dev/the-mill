/**
 * Bookings list — a table of all bookings with a status filter.
 *
 * The filter reads ?status= from the URL; the chips below set it. Server
 * component: queries Prisma directly and renders the table.
 */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { BOOKING_STATUSES, isBookingStatus } from "@/lib/types";
import type { BookingStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { BookingActions } from "@/components/BookingActions";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = isBookingStatus(status) ? status : undefined;

  const bookings = await prisma.booking.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    include: { guest: true, room: true },
    orderBy: { checkIn: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Bookings</h1>

      <div className="flex flex-wrap gap-2 text-sm">
        <FilterChip label="All" href="/bookings" active={!activeStatus} />
        {BOOKING_STATUSES.map((s) => (
          <FilterChip
            key={s}
            label={s.replace("_", " ")}
            href={`/bookings?status=${s}`}
            active={activeStatus === s}
          />
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Room</th>
              <th className="px-4 py-3 font-medium">Check-in</th>
              <th className="px-4 py-3 font-medium">Check-out</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No bookings match this filter.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {booking.guest.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {booking.room.number}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(booking.checkIn)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(booking.checkOut)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3">
                    <BookingActions
                      id={booking.id}
                      status={booking.status as BookingStatus}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right text-sm text-gray-500">
        {bookings.length} booking{bookings.length === 1 ? "" : "s"}
        {activeStatus ? ` · ${formatMoney(
          bookings.reduce((sum, b) => sum + b.totalAmount, 0),
        )} total` : ""}
      </p>
    </div>
  );
}

function FilterChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 ${
        active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
