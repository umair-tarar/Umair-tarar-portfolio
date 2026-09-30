/** ---------------------------------------------------------------
 *  Everything you may want to edit lives in this file:
 *  contact details, pricing, FAQ, calculator assumptions.
 * --------------------------------------------------------------- */

export const CONTACT = {
  name: "Muhammad Umair Tarar",
  email: "tararu810@gmail.com",
  phone: "+92 311 6302186",
  phoneHref: "tel:+923116302186",
  // WhatsApp number with country code, no + or spaces.
  whatsapp: "923116302186",
  linkedin: "https://www.linkedin.com/in/muhammad-umair-tarar/",
  // Paste your Calendly / Cal.com link to show a live booking calendar
  // (example: "https://calendly.com/your-name/30min"). Leave empty to show
  // the request form and WhatsApp instead.
  bookingUrl: "",
  // Paste a YouTube / Loom / Vimeo link (or an .mp4 file link) to show an
  // "Watch my intro" button in the About section. Leave empty to hide it.
  introVideoUrl: "",
  // Get a free access key at web3forms.com (enter your email, the key
  // arrives by email) and paste it here so forms land straight in your inbox.
  web3formsKey: "699754fc-ce5a-4a04-9329-a102403c9f64",
};

export const ROTATING_WORDS = [
  "Google Maps",
  "Local Search",
  "the Map Pack",
  "Nearby Customers",
];

export const PROBLEMS = [
  "Your Google Business Profile is half filled: wrong category, no posts, and far fewer reviews than the competitor next door.",
  "You post on social media every week, but the people nearby who are ready to buy still cannot find you.",
  "Your business name, address or phone number is different on different sites, which confuses Google.",
  "Competitors own the Map Pack, so their phone rings while yours stays quiet.",
  "You are not sure what marketing work is actually happening or whether it is working.",
];

export const WHO_I_WORK_WITH = [
  "Dentists & Clinics",
  "Restaurants & Cafes",
  "Salons & Med Spas",
  "Real Estate",
  "Construction & Estimation",
  "Home Services",
  "Law Firms",
  "Startups & Agencies",
];

export const FUNNEL_STAGES = [
  {
    stage: "Stage 01",
    name: "Awareness",
    lead: "They have a need",
    text: "Someone searches \"dentist near me\" or sees your ad on Facebook. You need to be visible at the moment they look.",
    points: [
      "Google Maps and local pack visibility",
      "Local keywords and service pages",
      "Social content and Meta Ads reach",
    ],
  },
  {
    stage: "Stage 02",
    name: "Consideration",
    lead: "They compare options",
    text: "They open two or three businesses and check photos, reviews and answers before deciding who to trust.",
    points: [
      "Fully optimized Google Business Profile",
      "Review system and fast replies",
      "Consistent citations and details",
    ],
  },
  {
    stage: "Stage 03",
    name: "Decision",
    lead: "They choose you",
    text: "After comparing, they pick one business. Trust signals, clear offers and easy-to-find details tip the choice in your favour.",
    points: [
      "Strong ratings and recent reviews",
      "Clear services, hours and details",
      "Service and location landing pages",
    ],
  },
  {
    stage: "Stage 04",
    name: "Action",
    lead: "They call, book or visit",
    text: "The final step turns interest into revenue: a call, a booking, a direction request or a message. It should take one tap.",
    points: [
      "One-tap call, directions and booking buttons",
      "Fast replies on calls, WhatsApp and forms",
      "Every call and request tracked, then a review requested",
    ],
  },
];

export type Plan = {
  name: string;
  blurb: string;
  price: number;
  unit: string;
  meta: string;
  featured?: boolean;
  premium?: boolean;
  groups: { title: string; items: string[] }[];
};

export type PlanTab = { id: string; label: string; plans: Plan[] };

// NOTE: prices below are starting suggestions. Change the numbers here.
export const PRICING: PlanTab[] = [
  {
    id: "local",
    label: "Local SEO",
    plans: [
      {
        name: "Starter",
        blurb: "Get your Google presence right. Profile and listings only.",
        price: 125,
        unit: "/month",
        meta: "Setup in 5 days",
        groups: [
          {
            title: "Google Business Profile",
            items: [
              "1 location, full profile optimization",
              "Categories, services, photos, Q&A",
              "4 profile posts per month",
            ],
          },
          {
            title: "Listings & Reviews",
            items: [
              "25 core citations built",
              "Name, address, phone cleanup",
              "Review request system setup",
            ],
          },
          { title: "Reporting", items: ["Monthly rankings and calls report"] },
        ],
      },
      {
        name: "Growth",
        blurb: "Adds on-page SEO and content. For contested cities.",
        price: 300,
        unit: "/month",
        meta: "Setup in 3 days",
        featured: true,
        groups: [
          {
            title: "Google Business Profile",
            items: [
              "Everything in Starter",
              "Weekly profile posts",
              "50 citations, duplicate listings removed",
            ],
          },
          {
            title: "Website & On-Page",
            items: [
              "On-page SEO for up to 8 pages",
              "3 service and location pages built",
              "Schema and internal linking fixes",
            ],
          },
          {
            title: "Content & Off-Page",
            items: ["4 SEO articles per month", "2 local backlinks per month"],
          },
          {
            title: "Reporting",
            items: ["Local rank tracking", "Monthly strategy call"],
          },
        ],
      },
      {
        name: "Authority",
        blurb: "Full local SEO management. I run the whole thing for you.",
        price: 550,
        unit: "/month",
        meta: "Priority support",
        premium: true,
        groups: [
          {
            title: "Google Business Profile",
            items: [
              "Everything in Growth, up to 3 locations",
              "Managed review generation campaign",
            ],
          },
          {
            title: "Full Website Management",
            items: [
              "On-page SEO across the whole site",
              "Unlimited service and location pages",
              "Monthly site health check and fixes",
            ],
          },
          {
            title: "Content & Off-Page",
            items: [
              "8 SEO articles per month",
              "4 to 6 quality backlinks per month",
            ],
          },
          {
            title: "Reporting",
            items: ["Bi-weekly reports", "WhatsApp access"],
          },
        ],
      },
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    plans: [
      {
        name: "Essentials",
        blurb: "Consistent social presence that supports your local SEO.",
        price: 180,
        unit: "/month",
        meta: "Setup in 5 days",
        groups: [
          {
            title: "Social Media",
            items: [
              "2 platforms managed",
              "12 posts per month with a content calendar",
              "Profile optimization",
            ],
          },
          {
            title: "Community",
            items: ["Comment and message monitoring"],
          },
          { title: "Reporting", items: ["Monthly performance report"] },
        ],
      },
      {
        name: "Growth",
        blurb: "Social media plus Meta Ads to bring in leads.",
        price: 350,
        unit: "/month",
        meta: "Setup in 3 days",
        featured: true,
        groups: [
          {
            title: "Social Media",
            items: [
              "Everything in Essentials",
              "20 posts per month, reels included",
            ],
          },
          {
            title: "Meta Ads",
            items: [
              "Facebook and Instagram campaign management",
              "Creative testing and budget optimization",
              "Pixel and conversion tracking setup",
            ],
          },
          {
            title: "Reporting",
            items: ["Bi-weekly report", "Monthly strategy call"],
          },
        ],
      },
      {
        name: "Scale",
        blurb: "Full-funnel marketing with local SEO built in.",
        price: 700,
        unit: "/month",
        meta: "Priority support",
        premium: true,
        groups: [
          {
            title: "Marketing",
            items: [
              "Everything in Growth",
              "3 platforms, 30 posts per month",
              "Lead generation campaigns and landing pages",
            ],
          },
          {
            title: "Local SEO",
            items: [
              "Google Business Profile management",
              "Review generation and reputation replies",
            ],
          },
          {
            title: "Reporting",
            items: ["Weekly reporting", "WhatsApp access"],
          },
        ],
      },
    ],
  },
  {
    id: "project",
    label: "One-Time Projects",
    plans: [
      {
        name: "Local SEO Audit",
        blurb: "A clear picture of where you stand and what to fix first.",
        price: 65,
        unit: " one-time",
        meta: "Delivered in 3 days",
        groups: [
          {
            title: "What you get",
            items: [
              "Google Business Profile review",
              "Competitor snapshot",
              "Citation and NAP check",
              "Prioritized action plan (PDF)",
            ],
          },
        ],
      },
      {
        name: "GBP Setup & Optimization",
        blurb: "A complete, optimized profile that is ready to rank.",
        price: 150,
        unit: " one-time",
        meta: "Delivered in 5 days",
        featured: true,
        groups: [
          {
            title: "Google Business Profile",
            items: [
              "Profile setup or full cleanup",
              "Categories, services, description",
              "Photos and Q&A setup",
            ],
          },
          {
            title: "Extras",
            items: ["Review request link and template", "First 4 posts written"],
          },
        ],
      },
      {
        name: "Local Presence Launch",
        blurb: "Everything a new local business needs to get found.",
        price: 300,
        unit: " one-time",
        meta: "Delivered in 10 days",
        premium: true,
        groups: [
          {
            title: "Google Business Profile",
            items: ["Full profile optimization", "Review system setup"],
          },
          {
            title: "Listings",
            items: ["50 citations built", "Duplicate listing removal"],
          },
          {
            title: "Website",
            items: ["On-page SEO for up to 5 pages", "2 service or location pages"],
          },
        ],
      },
    ],
  },
];

export const FAQS = [
  {
    q: "How long until I see results?",
    a: "Google Business Profile changes can move local rankings within 2 to 4 weeks. Meaningful, stable results in a competitive city usually take 3 to 6 months. Anyone promising page one in 30 days is either not being honest or targeting keywords nobody searches.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "Monthly plans run month to month, so you can cancel any time. One-time projects are a fixed scope for a fixed price.",
  },
  {
    q: "Do you run Meta Ads too?",
    a: "Yes. Alongside local SEO I manage Facebook and Instagram campaigns, including creative testing, budget optimization and conversion tracking. Ad spend is paid directly to Meta and is not included in my fee.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your business name, location, services and access to your Google Business Profile, website and social accounts (or permission to create them). I take care of the rest and keep you updated.",
  },
  {
    q: "Do you work with businesses outside Pakistan?",
    a: "Yes. I work remotely with local businesses and online companies in any country, and I research each market's local search results before we start.",
  },
  {
    q: "Do you guarantee a number one ranking?",
    a: "No one can honestly guarantee a specific ranking, because Google controls the results. What I promise is a proven process, transparent work and clear reporting on what changes and why.",
  },
  {
    q: "What does the free audit include?",
    a: "A review of your Google Business Profile, a snapshot of how you compare with local competitors, a check of your citations and reviews, and a short prioritized action plan. There is no obligation.",
  },
];

/**
 * Calculator assumptions. These are illustrative averages, not guarantees.
 * Share = the portion of local searchers who contact the business shown at
 * that Map Pack position. Adjust to match your own data.
 */
export const CALCULATOR = {
  positions: [
    { id: "none", label: "Not visible / below page 1", share: 0.005 },
    { id: "4-10", label: "Positions 4 to 10", share: 0.03 },
    { id: "3", label: "Position 3", share: 0.08 },
    { id: "2", label: "Position 2", share: 0.12 },
    { id: "1", label: "Position 1", share: 0.2 },
  ],
  targetShare: 0.2,
  defaultSearches: 1000,
  defaultValue: 100,
  defaultCloseRate: 30,
};

export type Client = {
  name: string;
  /** Path to the logo file, e.g. "/logos/cebrix.png". Leave out to show initials. */
  logo?: string;
  /** Optional small line under the name, e.g. "Marketing Agency". */
  category?: string;
};

/**
 * Companies shown in the scrolling "Trusted By" strip.
 * To add a logo: put the image in the public/logos folder and set `logo`.
 */
export const CLIENTS: Client[] = [
  { name: "Cebrix Marketing" },
  { name: "Tech-Hub Faisalabad" },
  { name: "HyperNexis" },
  { name: "CareerConnectly" },
  { name: "DEP LLC" },
  { name: "QuickBid Estimating" },
  { name: "Surblund International" },
  { name: "Global Turbo" },
];
