export interface SponsoredChild {
  slug: string;
  name: string;
  age: number;
  grade: string;
  location: string;
  dream: string;
  /** Bio paragraph as published on the client's live sponsorship page, corrected to use this child's own name throughout. */
  story: string;
  /** Indicative annual price range for sponsoring this child, as published on the client's live site. */
  priceRange: string;
  /** Real photograph, as published on the client's own live sponsorship page for this child. */
  image: { src: string; alt: string };
}

// Names, ages, stories and price ranges as published on the client's live
// child-sponsorship page (standardbookshop.in/ss/sponsor-a-child/).
export const sponsoredChildren: SponsoredChild[] = [
  {
    slug: "asha",
    name: "Asha",
    age: 17,
    grade: "Class 12",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Asha is a 17-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Asha is determined to build a better future.",
    priceRange: "₹1,750 – ₹9,000",
    image: { src: "/images/sponsorship/asha.jpg", alt: "Asha, a 17-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "simran",
    name: "Simran",
    age: 16,
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Simran is a 16-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Simran is determined to build a better future.",
    priceRange: "₹1,750 – ₹9,000",
    image: { src: "/images/sponsorship/simran.jpg", alt: "Simran, a 16-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "geeta",
    name: "Geeta",
    age: 17,
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Geeta is a 17-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Geeta is determined to build a better future.",
    priceRange: "₹1,750 – ₹9,000",
    image: { src: "/images/sponsorship/geeta.jpg", alt: "Geeta, a 17-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "rekha",
    name: "Rekha",
    age: 15,
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Rekha is a 15-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Rekha is determined to build a better future.",
    priceRange: "₹1,750 – ₹9,000",
    image: { src: "/images/sponsorship/rekha.png", alt: "Rekha, a 15-year-old sponsorship candidate from Delhi" },
  },
];

export function getSponsoredChild(slug: string): SponsoredChild | undefined {
  return sponsoredChildren.find((child) => child.slug === slug);
}

export const sponsorshipTier = {
  annual: 21000,
  monthly: 1750,
  minimumCommitmentYears: 3,
  impactLine: "Your donation will help fund the education of 2 children for 1 year.",
};

export const oneTimeSponsorshipAmounts = [100, 251, 500, 1001, 2100, 21000];

// Per-child donation presets, matching the ₹1,750–₹9,000 range published
// against each child on the client's live sponsorship page.
export const childSponsorshipAmounts = [1750, 3000, 5000, 9000];

export const sponsorshipProvides = [
  "Continuous educational access",
  "School supplies, uniforms and academic resources",
  "Health and nutritional assistance",
  "Prevention of child labour and early marriage",
  "Family awareness and community development",
];
