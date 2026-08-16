export const siteConfig = {
  name: "Shikshadwar Foundation",
  shortName: "Shikshadwar",
  url: "https://shikshadwarfoundation.org",
  description:
    "Shikshadwar Foundation is a Public Charitable Trust empowering underprivileged and marginalised communities across Delhi, Bihar, Uttar Pradesh, Rajasthan and Haryana through education, livelihood, healthcare, youth empowerment and environment sustainability programmes.",
  founder: "Manish Mandal",
  foundedYear: 2025,
  legalStatus: "Public Charitable Trust, registered under the Indian Trust Act, 1882 (Delhi, July 2025)",
  // Tax registration numbers, as published on the client's live site. Surfaced
  // on the donate page and in the Credibility section so donors seeking 80G
  // proof see the actual registration rather than just a "certified" claim.
  tax: {
    pan: "ABMTS4097G",
    certificate80G: "ABMTS4097GF20261",
  },
  contact: {
    address: {
      line1: "Khasra No. 839, First Floor, Aman Vihar",
      line2: "Kadipur, Delhi-110036",
      full: "Khasra No. 839, First Floor, Aman Vihar, Kadipur, Delhi-110036",
    },
    phone: "+91 98998 40108",
    phoneHref: "tel:+919899840108",
    email: "contact@shikshadwarfoundation.org",
  },
  social: {
    instagram: "https://www.instagram.com/shikshadwarfoundation/",
    facebook: "https://www.facebook.com/profile.php?id=61593185403122",
    x: "https://x.com/Shikshadwarfoun",
    linkedin: "https://www.linkedin.com/company/shikshadwar-foundation/?viewAsMember=true",
    youtube: "https://youtube.com/@shikshadwarfoundation?feature=shared",
  },
} as const;

// Keep in sync with --rust in app/globals.css. Razorpay's checkout iframe
// can't consume CSS custom properties, so this has to stay a literal.
export const RAZORPAY_THEME_COLOR = "#a83a2b";
