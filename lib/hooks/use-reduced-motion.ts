"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Declared at module scope so their identities are stable across renders —
// passing inline closures to useSyncExternalStore would resubscribe on every
// render.
function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

// The server can't know the user's preference, so it renders the
// motion-enabled branch. React reconciles against the real value
// immediately after hydration.
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Tracks `prefers-reduced-motion`.
 *
 * useSyncExternalStore rather than useEffect + useState: a media query is an
 * external store, and this is the hook built for reading one. It also avoids
 * the extra render the effect version paid on every mount — that version set
 * state synchronously inside the effect, which React 19's lint rules flag as
 * a cascading render.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
