/**
 * /api/bookings/[id] — a single booking.
 *
 * GET    /api/bookings/123      Fetch one booking with its guest and room.
 * PATCH  /api/bookings/123      Update status and/or notes.
 *                               Body: { status?, notes? }
 *                               Loops use this to confirm or cancel a booking.
 * DELETE /api/bookings/123      Delete a booking.
 *
 * In the Next.js App Router, dynamic route params arrive as a Promise and must
 * be awaited.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isBookingStatus } from "@/lib/types";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: Number(id) },
    include: { guest: true, room: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { status, notes } = body;
  if (status !== undefined && !isBookingStatus(status)) {
    return NextResponse.json(
      { error: `Invalid status: ${status}` },
      { status: 400 },
    );
  }

  const existing = await prisma.booking.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      ...(status !== undefined ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    },
    include: { guest: true, room: true },
  });

  return NextResponse.json(booking);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;

  const existing = await prisma.booking.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  await prisma.booking.delete({ where: { id: Number(id) } });
  return NextResponse.json({ deleted: true });
}
