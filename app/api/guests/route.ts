/**
 * /api/guests — the guest list.
 *
 * GET  /api/guests             List all guests, alphabetically by name.
 * POST /api/guests             Create a guest.
 *                              Body: { name, email, phone? }
 *                              Email must be unique.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const guests = await prisma.guest.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(guests);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, phone } = body;
  if (!name || !email) {
    return NextResponse.json(
      { error: "name and email are required." },
      { status: 400 },
    );
  }

  const existing = await prisma.guest.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "A guest with that email already exists." },
      { status: 409 },
    );
  }

  const guest = await prisma.guest.create({
    data: { name, email, phone: phone ?? null },
  });

  return NextResponse.json(guest, { status: 201 });
}
