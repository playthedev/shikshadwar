export const aboutIntro = {
  image: {
    src: "/images/about/intro.jpg",
    alt: "A group of women community members from a Shikshadwar programme area pose confidently together",
  },
  paragraphs: [
    "Slums and villages lack access to basic services such as education, healthcare, and other essential facilities. Children often drop out of school to support their parents in earning a livelihood and meeting basic needs. People living in these areas suffer from poor health conditions due to a lack of education, which leads to low awareness about health and hygiene.",
    "To bring about a positive change in the lives of underprivileged and marginalized communities, our founder took the initiative and began working in the slums of Delhi with a group of volunteers to promote awareness about the importance of education, healthcare, and hygiene. We soon realized that health is directly connected to and significantly impacts people's socio-economic conditions, education, and livelihoods.",
    "With this understanding, education programs, non-formal tutoring, and literacy drives were organized in Bhalaswa Slum and Kadipur village. Following the success of these initiatives, Shikshadwar Foundation — a not-for-profit organization — was established in 2025 with a vision to create positive change and bridge critical gaps by providing essential services to underprivileged communities.",
    "The organization was founded by Mr. Manish Mandal and was formally registered under the Indian Trust Act, 1882, in July 2025 in Delhi. It began with humble efforts such as providing remedial education and livelihood opportunities to marginalized communities in Bhalaswa Slum and Kadipur Village. Since then, it has worked towards uplifting underserved populations and has expanded its operations across key areas, including education, livelihood, skilling, healthcare, youth empowerment, and the environment in the states of Delhi, Bihar, Uttar Pradesh, Rajasthan, and Haryana.",
    "Shikshadwar Foundation envisions a society of empowered individuals who realize their full potential in a sustainable and equitable manner. The organization strives to empower marginalized communities so they can become economically and socially secure, live with dignity, and contribute meaningfully to society. This change is driven and owned by the communities themselves, grounded in the highest principles of human rights.",
  ],
};

export const missionVision = {
  intro:
    "Our work began with volunteers in Delhi slums and grew through programs in Bhalaswa and Kadipur. Today we partner with communities across several states, with priorities shaped on the ground by the people we serve.",
  mission:
    "Empower marginalized communities so they can become economically and socially secure, live with dignity, and contribute meaningfully to society. Change is driven and owned by communities themselves, grounded in the highest principles of human rights.",
  vision:
    "A society of empowered individuals who realize their full potential in a sustainable and equitable manner.",
};

export const certificates = [
  {
    title: "Vocational Skill Training",
    description:
      "Certifying our vocational skill-building sessions, which equip community members with practical, income-ready trades.",
    image: "/images/about/cert-vocational-skill-training.png",
  },
  {
    title: "Recognition in GBSSS School",
    description:
      "Formal recognition from the Government Boys Senior Secondary School for our on-ground education and mentoring work.",
    // Tall event photo rather than a document scan — bias the crop toward
    // the top so faces aren't cut off when it's cropped to a landscape card.
    image: "/images/about/cert-recognition-gbsss.png",
    objectPosition: "center 20%",
  },
  {
    title: "Teaching Vocational Skills — Bhalswa Village",
    description:
      "Ministry of Education (Vidyanjali) certificate for teaching vocational skills at Govt. Boys Sr. Sec. School, Bhalswa Village, Delhi.",
    image: "/images/about/cert-teaching-vocational-skills.png",
  },
  {
    title: "Teaching Vocational Skills — Shalimar Bagh",
    description:
      "Ministry of Education (Vidyanjali) certificate for teaching vocational skills at MCD Primary School, AB-Block, Shalimar Bagh, Delhi.",
    image: "/images/about/cert-teaching-vocational-skills-2.png",
  },
  {
    title: "Gardening Equipment — 12 Items",
    description:
      "Ministry of Education (Vidyanjali) certificate for contributing 12 gardening equipment items to MCD Primary School, Shalimar Bagh, Delhi.",
    image: "/images/about/cert-gardening-equipment.png",
  },
  {
    title: "Gardening Equipment — 2 Items",
    description:
      "Ministry of Education (Vidyanjali) certificate for contributing gardening equipment to MCD Primary School, Shalimar Bagh, Delhi.",
    image: "/images/about/cert-gardening-equipment-2.png",
  },
];

export const trustees = [
  {
    slug: "manish-mandal",
    name: "Manish Mandal",
    role: "Founder Trustee",
    image: "/images/about/trustee-manish-mandal.png",
    bio: [
      "Manish's work began in 2012 with a chance encounter outside Jahangirpuri Metro Station in Delhi, and took him through a decade at Shakti Vahini, Salaam Baalak Trust, TB Alert India and Prayatna — building expertise in child protection, financial management, donor compliance and institutional development.",
      "In 2025, together with Silky Aggarwal and Suraj Kumar Mandal, he founded Shikshadwar Foundation to build a direct pathway from education to employability to self-reliance.",
    ],
  },
  {
    slug: "suraj-kumar-mandal",
    name: "Suraj Kumar Mandal",
    role: "Co-Founder & Trustee",
    image: "/images/about/trustee-suraj-kumar-mandal.jpg",
    bio: [
      "Suraj is a dedicated social development professional with over five years of experience designing and implementing community-based development programmes across education, youth development, public health, women's empowerment, environmental sustainability, community engagement and corporate social responsibility (CSR).",
      "He has worked with leading development organisations including Read India, Center for Catalyzing Change (C3), TB Alert India, Sponsor A Child Foundation, Children International and Blue Planet Environmental Solutions — leading community mobilisation, volunteer engagement, stakeholder coordination and partnerships with government departments, educational institutions, healthcare providers and corporate CSR partners.",
      "As Co-Founder, he provides strategic leadership on programme planning, institutional development, partnership building and volunteer management. His work has earned national recognition, including the Best Pragati Mitra – North India (2024) and Best Pragati Mitra – India (2025) awards under the Amazon CSR-supported Read India initiative, alongside certifications from WHO, ICMR, UNICEF, CBSE-DIKSHA and DCPCR. He holds a Master of Social Work (MSW) from IGNOU.",
    ],
  },
  {
    slug: "silky-aggarwal",
    name: "Silky Aggarwal",
    role: "Trustee",
    image: "/images/about/trustee-silky-aggarwal.jpg",
    bio: [
      "Silky is a dedicated development sector professional with nearly a decade of experience in the social impact ecosystem, known for combining compassion with professionalism. She has worked with Sarthak Educational Trust, Udayan Care and TeamLease Foundation, strengthening financial management systems, transparency, regulatory compliance, donor reporting and effective use of resources.",
      "Her expertise in financial planning, budgeting, grant management and organisational accountability helps social programmes run more efficiently and sustainably. As a Trustee of Shikshadwar Foundation, she supports strategic planning, financial governance and programme implementation across education, skill development, women's empowerment, youth leadership and environmental sustainability.",
    ],
  },
];

export function getTrustee(slug: string) {
  return trustees.find((trustee) => trustee.slug === slug);
}

export const team = [
  {
    slug: "geeta",
    name: "Geeta",
    role: "Volunteer cum Community Mobilizer",
    image: "/images/about/team-geeta.jpg",
    bio: [
      "Geeta works at the frontline of Shikshadwar's community outreach, going door-to-door to bring families into our education and livelihood programmes. Her familiarity with the neighbourhoods we serve makes her one of the first trusted faces new families meet.",
      "Beyond mobilisation, she helps coordinate attendance drives and community meetings, making sure the people our programmes are built for have a say in how they run.",
    ],
  },
  {
    slug: "anup-kumar",
    name: "Anup Kumar",
    role: "Volunteer Teacher",
    image: "/images/about/team-anup-kumar.png",
    bio: [
      "Anup teaches at one of Shikshadwar's remedial learning centres, helping children catch up on foundational literacy and numeracy skills they've missed. His classroom is known for patient, one-on-one attention to students who've fallen behind.",
      "He also mentors newer volunteers joining the teaching programme, passing on classroom techniques that work in under-resourced settings.",
    ],
  },
  {
    slug: "karan-rajput",
    name: "Karan Rajput",
    role: "Volunteer Teacher",
    image: "/images/about/team-karan-rajput.jpg",
    bio: [
      "Karan brings energy and consistency to Shikshadwar's after-school learning sessions, working with children across multiple grade levels in our programme areas.",
      "He's especially focused on keeping children engaged through hands-on, activity-based learning rather than rote instruction.",
    ],
  },
  {
    slug: "asha-rai",
    name: "Asha Rai",
    role: "Volunteer cum Community Mobilizer",
    image: "/images/about/team-asha.png",
    bio: [
      "Asha connects Shikshadwar's programmes with the families who need them most, building the trust that keeps children enrolled and attending consistently.",
      "She works closely with parents and local community leaders to identify gaps our programmes can address, from school dropouts to healthcare access.",
    ],
  },
  {
    slug: "neha",
    name: "Neha",
    role: "Volunteer Teacher",
    image: "/images/about/team-neha.jpg",
    bio: [
      "Neha teaches at one of Shikshadwar's learning centres, helping students build the foundational skills they need to stay on track at school.",
      "She works closely with the rest of the teaching team to keep lessons consistent and engaging across every grade level in her centre.",
    ],
  },
  {
    slug: "nisha",
    name: "Nisha",
    role: "Volunteer Teacher",
    image: "/images/about/team-nisha.jpg",
    bio: [
      "Nisha teaches at one of Shikshadwar's learning centres, helping students build the foundational skills they need to stay on track at school.",
      "She works closely with the rest of the teaching team to keep lessons consistent and engaging across every grade level in her centre.",
    ],
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}
