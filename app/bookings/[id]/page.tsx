/**
 * Booking detail — everything about one booking: guest, room, dates, amount,
 * notes, and Confirm/Cancel actions.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import type { BookingStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { BookingActions } from "@/components/BookingActions";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookingId = Number(id);
  if (!Number.isInteger(bookingId) || bookingId <= 0) notFound();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { guest: true, room: true },
  });

  if (!booking) notFound();

  const nights = Math.max(
    1,
    Math.round(
      (booking.checkOut.getTime() - booking.checkIn.getTime()) / 86_400_000,
    ),
  );

  return (
    <div className="space-y-6">
      <Link
        href="/bookings"
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to bookings
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{booking.guest.name}</h1>
          <p className="text-sm text-gray-500">Booking #{booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <DetailCard title="Stay">
          <Field label="Room">
            Room {booking.room.number} · {booking.room.type} · Floor{" "}
            {booking.room.floor}
          </Field>
          <Field label="Check-in">{formatDate(booking.checkIn)}</Field>
          <Field label="Check-out">{formatDate(booking.checkOut)}</Field>
          <Field label="Nights">{nights}</Field>
          <Field label="Total">{formatMoney(booking.totalAmount)}</Field>
        </DetailCard>

        <DetailCard title="Guest">
          <Field label="Name">{booking.guest.name}</Field>
          <Field label="Email">{booking.guest.email}</Field>
          <Field label="Phone">{booking.guest.phone ?? "—"}</Field>
        </DetailCard>
      </div>

      {booking.notes && (
        <DetailCard title="Notes">
          <p className="text-sm text-gray-700">{booking.notes}</p>
        </DetailCard>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <BookingActions
          id={booking.id}
          status={booking.status as BookingStatus}
        />
      </div>
    </div>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-medium text-gray-500">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-gray-900">{children}</span>
    </div>
  );
}
