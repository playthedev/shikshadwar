"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  slug: string;
  /** Display name, already formatted as the caller wants it shown (e.g. "Meet Asha"). */
  name: string;
  /** Product photo / child photo. Omitted for catalogue items that only have an illustration icon. */
  image?: string;
  /** Link back to the item's detail page, e.g. /meet-our-stars/asha/ or /support-us/bamboo-pen-stand/. */
  href: string;
  /** e.g. "Monthly" / "Yearly" for a sponsorship — omitted for a plain product. */
  variantLabel?: string;
  unitAmount: number;
  quantity: number;
}

// Bumped to v2 when the item shape gained `href` — older carts saved under
// the v1 key are missing it, which crashed <Link> with `href={undefined}`.
const STORAGE_KEY = "shikshadwar-cart-v2";

const EMPTY_CART: CartItem[] = [];

let items: CartItem[] = EMPTY_CART;
let loaded = false;
const listeners = new Set<() => void>();

function isValidItem(value: unknown): value is CartItem {
  const item = value as Partial<CartItem> | null;
  return (
    !!item &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.href === "string" &&
    typeof item.unitAmount === "number" &&
    typeof item.quantity === "number"
  );
}

function load() {
  if (typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    items = Array.isArray(parsed) ? parsed.filter(isValidItem) : EMPTY_CART;
  } catch {
    items = EMPTY_CART;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((listener) => listener());
}

// Line items are keyed by slug + variant, so sponsoring the same child
// Monthly and Yearly (or the same product twice) shows up as one merged row.
function lineKey(slug: string, variantLabel?: string) {
  return `${slug}__${variantLabel ?? ""}`;
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
  load();
  const existing = items.find((i) => lineKey(i.slug, i.variantLabel) === lineKey(item.slug, item.variantLabel));
  if (existing) {
    existing.quantity += quantity;
  } else {
    items = [...items, { ...item, quantity }];
  }
  persist();
}

export function updateQuantity(slug: string, variantLabel: string | undefined, quantity: number) {
  load();
  items = items
    .map((i) =>
      lineKey(i.slug, i.variantLabel) === lineKey(slug, variantLabel)
        ? { ...i, quantity: Math.max(1, quantity) }
        : i,
    )
    .filter((i) => i.quantity > 0);
  persist();
}

export function removeFromCart(slug: string, variantLabel?: string) {
  load();
  items = items.filter((i) => lineKey(i.slug, i.variantLabel) !== lineKey(slug, variantLabel));
  persist();
}

export function clearCart() {
  items = [];
  persist();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return items;
}

function getServerSnapshot() {
  // Must return the same reference every call — a fresh [] here makes
  // useSyncExternalStore think the store changes on every render.
  return EMPTY_CART;
}

/** Reactive cart contents, backed by localStorage so it survives navigation. */
export function useCart() {
  if (typeof window !== "undefined" && !loaded) {
    // Lazily hydrate from storage on first read in the browser.
    load();
  }
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function cartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0);
}

export function cartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
