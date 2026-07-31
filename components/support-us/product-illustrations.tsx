import type { SVGProps } from "react";
import type { ProductIllustration } from "@/lib/products";

/**
 * Flat, on-brand stand-ins for real product photography — deliberately
 * illustrated rather than a stock photo of someone else's product, since
 * these items don't exist as physical stock yet. Swap for real photography
 * once the client has actual pieces to shoot (see the note on lib/products.ts).
 */
function ToteBagIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <path
        d="M78 70c0-15 10-26 22-26s22 11 22 26"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M52 76h96l8 88a10 10 0 0 1-10 11H54a10 10 0 0 1-10-11l8-88Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M70 100v20M130 100v20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function PouchIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <rect
        x="44"
        y="66"
        width="112"
        height="80"
        rx="18"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M44 92h112" stroke="currentColor" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
      <rect x="92" y="80" width="16" height="10" rx="3" fill="currentColor" />
      <path d="M92 66c0-8 4-14 8-14s8 6 8 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CushionIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <rect
        x="46"
        y="46"
        width="108"
        height="108"
        rx="14"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="5"
      />
      <rect
        x="60"
        y="60"
        width="80"
        height="80"
        rx="8"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  );
}

function LaptopSleeveIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <rect
        x="40"
        y="70"
        width="120"
        height="80"
        rx="10"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M40 92h120" stroke="currentColor" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
      <path d="M85 70l15-16 15 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const illustrations: Record<ProductIllustration, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  tote: ToteBagIllustration,
  pouch: PouchIllustration,
  cushion: CushionIllustration,
  sleeve: LaptopSleeveIllustration,
};

export function ProductIllustrationIcon({
  illustration,
  ...props
}: { illustration: ProductIllustration } & SVGProps<SVGSVGElement>) {
  const Illustration = illustrations[illustration];
  return <Illustration {...props} />;
}
