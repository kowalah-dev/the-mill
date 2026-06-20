/**
 * Dashboard — two panels:
 *   • Today's Arrivals — CONFIRMED bookings checking in today.
 *   • Room Occupancy   — a count of rooms by status.
 *
 * This is a React Server Component: it queries Prisma directly at request time.
 * (The /api routes exist for programmatic access — loops, agents, scripts.)
 */
import { prisma } from "@/lib/db";
import { ROOM_STATUSES } from "@/lib/types";
import { BookingCard } from "@/components/BookingCard";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfTomorrow(): Date {
  const d = startOfToday();
  d.setDate(d.getDate() + 1);
  return d;
}

export default async function DashboardPage() {
  const [arrivals, rooms] = await Promise.all([
    prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        checkIn: { gte: startOfToday(), lt: startOfTomorrow() },
      },
      include: { guest: true, room: true },
      orderBy: { room: { number: "asc" } },
    }),
    prisma.room.findMany(),
  ]);

  const occupancy = ROOM_STATUSES.map((status) => ({
    status,
    count: rooms.filter((r) => r.status === status).length,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-medium">Today&apos;s Arrivals</h2>
          {arrivals.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              No confirmed arrivals today.
            </p>
          ) : (
            <div className="space-y-3">
              {arrivals.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium">Room Occupancy</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {occupancy.map(({ status, count }) => (
                  <tr key={status}>
                    <td className="px-4 py-3">
                      <StatusBadge status={status} />
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {count}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Total</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">
                    {rooms.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
