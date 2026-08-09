export interface SponsoredChild {
  slug: string;
  name: string;
  age: number;
  dob: string;
  grade: string;
  location: string;
  dream: string;
  /** Bio paragraph as written in the client's "Sponsor a Child" brief, corrected to use this child's own name throughout — the source document reused Rekha's name in every child's opening sentence. */
  story: string;
  /** Real photograph, as supplied in the client's brief for this child. */
  image: { src: string; alt: string };
}

// Names, ages, dates of birth, grades and stories as given in the client's
// "Sponsor a Chil- Shikshadwar.pdf" brief.
export const sponsoredChildren: SponsoredChild[] = [
  {
    slug: "asha",
    name: "Asha",
    age: 17,
    dob: "9 July 2009",
    grade: "Class 12",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Asha is a 17-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Asha is determined to build a better future. She is eager to learn, grow, and make a positive difference in her community through education and hard work. Through your support, Asha can gain the knowledge, confidence, and opportunities she needs to pursue her dreams and break the cycle of poverty.",
    image: { src: "/images/sponsorship/asha.jpg", alt: "Asha, a 17-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "simran",
    name: "Simran",
    age: 16,
    dob: "9 December 2010",
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Simran is a 16-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Simran is determined to build a better future. She is eager to learn, grow, and make a positive difference in her community through education and hard work. Through your support, Simran can gain the knowledge, confidence, and opportunities she needs to pursue her dreams and break the cycle of poverty.",
    image: { src: "/images/sponsorship/simran.jpg", alt: "Simran, a 16-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "geeta",
    name: "Geeta",
    age: 17,
    dob: "5 April 2009",
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Geeta is a 17-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Geeta is determined to build a better future. She is eager to learn, grow, and make a positive difference in her community through education and hard work. Through your support, Geeta can gain the knowledge, confidence, and opportunities she needs to pursue her dreams and break the cycle of poverty.",
    image: { src: "/images/sponsorship/geeta.jpg", alt: "Geeta, a 17-year-old sponsorship candidate from Delhi" },
  },
  {
    slug: "rekha",
    name: "Rekha",
    age: 15,
    dob: "10 May 2010",
    grade: "Class 10",
    location: "Delhi, India",
    dream: "To become a doctor",
    story:
      "Rekha is a 15-year-old girl from Delhi, India, with a dream of becoming a doctor. Growing up in a community where the average household income is around ₹10,000 per month, many families struggle to meet their basic needs, making it difficult for children to access the opportunities they deserve. Despite these challenges, Rekha is determined to build a better future. She is eager to learn, grow, and make a positive difference in her community through education and hard work. Through your support, Rekha can gain the knowledge, confidence, and opportunities she needs to pursue her dreams and break the cycle of poverty.",
    image: { src: "/images/sponsorship/rekha.png", alt: "Rekha, a 15-year-old sponsorship candidate from Delhi" },
  },
];

export function getSponsoredChild(slug: string): SponsoredChild | undefined {
  return sponsoredChildren.find((child) => child.slug === slug);
}

// Tagline shown under the "Meet {name}" heading on each child's page.
export const sponsoredChildTagline = "A Bright Future Starts with Opportunity";

export const sponsorshipTier = {
  annual: 21000,
  monthly: 1750,
  minimumCommitmentYears: 3,
};

// The brief gives one flat rate for every child (₹1,750/month or
// ₹21,000/year) rather than a per-child range, so both the general and
// per-child sponsorship forms share this same pair of presets.
export const oneTimeSponsorshipAmounts = [sponsorshipTier.monthly, sponsorshipTier.annual];
export const childSponsorshipAmounts = [sponsorshipTier.monthly, sponsorshipTier.annual];

// "What Does Child Sponsorship Mean?"
export const sponsorshipMeansIntro =
  "When you sponsor a child, you are investing in a child's future while strengthening the entire community. Your contribution helps us:";
export const sponsorshipProvides = [
  "Ensure uninterrupted access to education.",
  "Provide school supplies, uniforms, and learning support.",
  "Improve children's health, nutrition, and well-being.",
  "Prevent child labour, child marriage, and school dropouts.",
  "Empower families through awareness and community development initiatives.",
];

// "Become a Regular Supporter"
export const regularSupporterIntro =
  "Regular donations enable us to plan and implement long-term educational interventions that create lasting impact. Your consistent support helps children stay in school and continue their journey toward a better future.";

// "Your Sponsorship Makes a Difference"
export const sponsorshipDifference = [
  "You help a child continue their education with dignity.",
  "You support holistic development beyond the classroom.",
  "You contribute to creating safer and stronger communities.",
  "You help families build a more secure future for their children.",
];

// "Tax Benefits"
export const taxBenefitsNote =
  "Donations made to Shikshadwar Foundation are eligible for tax benefits under applicable provisions of the Income Tax Act, subject to the Foundation's registration status.";

// "Together, We Can Build Futures"
export const sponsorshipClosing =
  "Your sponsorship is more than a donation—it is a commitment to hope, education, and opportunity. Sponsor a child today and help create a future where every child has the chance to learn, dream, and succeed.";

// "How is your money spent?"
export const moneySpent = [
  { value: 80, suffix: "%", label: "of the donations we receive are used to strengthen these initiatives on the ground." },
  { value: 13, suffix: "%", label: "of the donations we raise are used to strengthen the support systems that help us monitor and evaluate these initiatives." },
  { value: 7, suffix: "%", label: "of the funds we raise are used for activities that help us mobilise resources and guarantee long-term support to these initiatives." },
];
