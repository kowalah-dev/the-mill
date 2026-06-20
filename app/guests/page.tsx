/**
 * Guests — a list of every guest with a count of their bookings.
 */
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GuestsPage() {
  const guests = await prisma.guest.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { bookings: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Guests</h1>
        <p className="text-sm text-gray-500">{guests.length} guests</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 text-right font-medium">Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {guest.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{guest.email}</td>
                <td className="px-4 py-3 text-gray-600">
                  {guest.phone ?? "—"}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                  {guest._count.bookings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
