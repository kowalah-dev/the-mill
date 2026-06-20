/**
 * Shared domain types for The Mill.
 *
 * SQLite has no native enums, so the Prisma schema stores `type` and `status`
 * as plain strings. These union types and value arrays are the single source
 * of truth for the allowed values — import from here rather than typing raw
 * string literals throughout the app.
 */

export const ROOM_TYPES = ["SINGLE", "DOUBLE", "SUITE"] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_STATUSES = [
  "AVAILABLE",
  "OCCUPIED",
  "MAINTENANCE",
  "RESERVED",
] as const;
export type RoomStatus = (typeof ROOM_STATUSES)[number];

export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** Narrowing helpers — handy when validating untrusted input in API routes. */
export const isBookingStatus = (value: unknown): value is BookingStatus =>
  typeof value === "string" && (BOOKING_STATUSES as readonly string[]).includes(value);

export const isRoomStatus = (value: unknown): value is RoomStatus =>
  typeof value === "string" && (ROOM_STATUSES as readonly string[]).includes(value);
