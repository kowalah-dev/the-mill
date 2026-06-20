/**
 * StatusBadge — a colour-coded label for booking and room statuses.
 *
 * Colours are intentionally simple Tailwind utility classes rather than badge
 * variants, so the mapping from status to colour is obvious at a glance.
 */
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  // Booking statuses
  PENDING: "bg-amber-100 text-amber-800 ring-amber-600/20",
  CONFIRMED: "bg-blue-100 text-blue-800 ring-blue-600/20",
  CHECKED_IN: "bg-green-100 text-green-800 ring-green-600/20",
  CHECKED_OUT: "bg-gray-100 text-gray-700 ring-gray-500/20",
  CANCELLED: "bg-red-100 text-red-800 ring-red-600/20",
  // Room statuses
  AVAILABLE: "bg-green-100 text-green-800 ring-green-600/20",
  RESERVED: "bg-amber-100 text-amber-800 ring-amber-600/20",
  OCCUPIED: "bg-red-100 text-red-800 ring-red-600/20",
  MAINTENANCE: "bg-gray-100 text-gray-700 ring-gray-500/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700 ring-gray-500/20",
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
