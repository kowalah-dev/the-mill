"use client";

/**
 * BookingActions — Confirm / Cancel buttons for a booking row.
 *
 * A client component: it PATCHes /api/bookings/[id] then refreshes the server
 * component tree so the new status shows immediately. This is the same API the
 * Intermediate confirmation loop drives programmatically.
 */
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { BookingStatus } from "@/lib/types";

export function BookingActions({
  id,
  status,
}: {
  id: number;
  status: BookingStatus;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(next: BookingStatus) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? `Update failed (${res.status}).`);
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      setError("Update failed — check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || isPending;
  const canConfirm = status === "PENDING";
  const canCancel = status !== "CANCELLED" && status !== "CHECKED_OUT";

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex justify-end gap-2">
        {canConfirm && (
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => setStatus("CONFIRMED")}
          >
            Confirm
          </Button>
        )}
        {canCancel && (
          <Button
            size="sm"
            variant="ghost"
            disabled={disabled}
            onClick={() => setStatus("CANCELLED")}
          >
            Cancel
          </Button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-right text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
