"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const RESERVE_SECONDS = 60 * 60;

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** The "saved for N minutes" urgency banner, shared by both cart pages. */
export function CartReserveBanner({ active }: { active: boolean }) {
  const [secondsLeft, setSecondsLeft] = useState(RESERVE_SECONDS);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex items-center gap-3 rounded-(--radius) bg-muted p-4 text-sm text-ink">
      <Flame aria-hidden="true" className="size-5 shrink-0 text-rust" />
      <p>
        An item of your cart is in high demand. Your cart is saved for{" "}
        <span className="font-semibold text-rust tabular-nums">{formatCountdown(secondsLeft)}</span>{" "}
        minutes!
      </p>
    </div>
  );
}
