"use client";

import ReactDOM from "react-dom";

/**
 * Resource hints, not the script itself — opens the connection to
 * checkout.razorpay.com during the initial (still server-rendered) render so
 * the DNS/TLS handshake happens in parallel with the rest of the page,
 * rather than only starting once a donation form mounts and requests the
 * script. Uses the App Router's blessed ReactDOM hint APIs rather than a
 * hand-rolled <link> in <head>, which Next's own layout docs say not to do.
 */
export function PreconnectRazorpay() {
  ReactDOM.preconnect("https://checkout.razorpay.com", { crossOrigin: "anonymous" });
  ReactDOM.prefetchDNS("https://checkout.razorpay.com");
  return null;
}
