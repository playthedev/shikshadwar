import type { SVGProps } from "react";

// lucide-react dropped brand marks, so these are small inline glyphs shared
// between the footer and the floating social rail.
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.96h2.46V21h3.04Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 10.6 20.4 3h-1.6l-5.9 6.6L8.2 3H3l7.1 10.1L3 21h1.6l6.2-7 5 7H21l-7.4-10.4Zm-2.2 2.5-.7-1L5 4.3h2.4l4.6 6.5.7 1 6 8.4h-2.4l-4.9-6.7Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3.25a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM21 21h-3.38v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V21H9.65V8.5h3.24v1.7h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V21Z" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.004 0C7.164 0 0 7.163 0 16.002c0 2.82.738 5.566 2.14 7.982L0 32l8.213-2.104a15.94 15.94 0 0 0 7.79 2.023h.004c8.838 0 16.002-7.163 16.002-16.002C32.01 7.163 24.845 0 16.004 0Zm0 29.26h-.003a13.26 13.26 0 0 1-6.755-1.85l-.485-.287-4.874 1.25 1.301-4.752-.316-.487a13.24 13.24 0 0 1-2.03-7.132C2.842 8.638 8.646 2.834 16.004 2.834c3.548 0 6.883 1.383 9.39 3.892a13.19 13.19 0 0 1 3.887 9.38c-.003 7.363-6.007 13.154-13.277 13.154Zm7.273-9.858c-.398-.199-2.357-1.164-2.723-1.297-.365-.133-.63-.199-.896.2-.265.398-1.028 1.296-1.26 1.562-.232.265-.464.298-.862.1-.398-.2-1.68-.62-3.2-1.978-1.183-1.055-1.981-2.358-2.213-2.756-.232-.398-.025-.613.174-.812.179-.178.398-.464.597-.696.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.696-.1-.199-.896-2.16-1.228-2.958-.323-.776-.652-.671-.896-.684a17.2 17.2 0 0 0-.763-.014c-.265 0-.696.1-1.06.497-.365.398-1.393 1.362-1.393 3.322 0 1.96 1.426 3.854 1.625 4.12.199.265 2.807 4.287 6.8 6.011.95.41 1.692.655 2.27.838.954.303 1.822.26 2.508.158.765-.114 2.357-.964 2.689-1.895.332-.93.332-1.729.232-1.895-.1-.166-.365-.265-.763-.464Z" />
    </svg>
  );
}
