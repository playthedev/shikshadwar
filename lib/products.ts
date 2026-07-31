export type ProductIllustration = "tote" | "pouch" | "cushion" | "sleeve";

export interface Product {
  slug: string;
  name: string;
  description: string;
  /** Which programme trains and employs the makers — ties the purchase to real programme work. */
  madeBy: string;
  /** Illustrative unit price, in whole rupees — swap for the client's real pricing before launch. */
  price: number;
  illustration: ProductIllustration;
}

/**
 * Illustrative starter catalogue for the Support Us / shop page — items made
 * by women trained through the Livelihood programme's tailoring and
 * enterprise-development work (see lib/programmes.ts). Prices and the
 * illustrations in components/support-us/product-illustrations.tsx are
 * placeholders: swap in the client's real products, pricing and photography
 * (with documented maker consent) before this page goes live for real
 * orders — see PhotoPlaceholder for why an invented stock photo is never
 * used as a stand-in here.
 */
export const products: Product[] = [
  {
    slug: "upcycled-sack-tote-bag",
    name: "Upcycled Sack Tote Bag",
    description:
      "A sturdy everyday tote, hand-stitched from repurposed sack cloth by women trained in our tailoring programme.",
    madeBy: "Women Tailoring & Entrepreneurship Training Programme",
    price: 450,
    illustration: "tote",
  },
  {
    slug: "hand-embroidered-pouch",
    name: "Hand-Embroidered Pouch",
    description:
      "A small zip pouch finished with hand embroidery — a first project for many of our trainees.",
    madeBy: "Women Tailoring & Entrepreneurship Training Programme",
    price: 250,
    illustration: "pouch",
  },
  {
    slug: "patchwork-cushion-cover",
    name: "Patchwork Cushion Cover",
    description:
      "Cushion covers pieced together from fabric offcuts, part of our zero-waste stitching practice.",
    madeBy: "Women Tailoring & Entrepreneurship Training Programme",
    price: 350,
    illustration: "cushion",
  },
  {
    slug: "quilted-laptop-sleeve",
    name: "Quilted Laptop Sleeve",
    description:
      "A padded, quilted sleeve stitched to order — one of the more advanced pieces our trainees take on.",
    madeBy: "Women Tailoring & Entrepreneurship Training Programme",
    price: 650,
    illustration: "sleeve",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
