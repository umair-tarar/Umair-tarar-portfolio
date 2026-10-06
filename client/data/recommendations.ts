/**
 * LinkedIn recommendations, copied word for word from the profile.
 * To add another: add an object to the list (newest first).
 */
export type Recommendation = {
  name: string;
  headline: string;
  relation: string;
  date: string;
  text: string[];
};

export const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-umair-tarar/details/recommendations/";

export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Zuriyat Fatima",
    headline:
      "Local SEO Specialist | Google Business Profile Optimization | Helping Local Businesses Rank in Google Maps and Get More Calls, Leads and Customers",
    relation: "Client",
    date: "October 6, 2026",
    text: [
      "I had the pleasure of working with Muhammad Umair Tarar, whom I hired for a digital marketing project, and I am glad I did. He understood my requirements clearly, kept me updated throughout the process, and completed the project with professionalism and dedication.",
      "Umair is hardworking, responsive, and open to feedback. He put real effort into delivering work that matched my goals, and I was happy with the final result.",
      "I would not hesitate to work with him again, and I confidently recommend him to anyone looking for a reliable digital marketing professional.",
    ],
  },
  {
    name: "Fatima Shahid",
    headline:
      "SEO Strategist for SaaS & Local Businesses | Helping You Rank, Get Found & Grow Revenue Through Full-Funnel SEO + AI",
    relation: "Client",
    date: "September 30, 2026",
    text: [
      "I had the opportunity to work with Muhammad Umair in digital marketing. He has a good understanding of social media marketing, content creation, and managing online platforms. He is responsible, hardworking, and takes his work seriously.",
      "Umair is easy to work with, communicates well, and is always open to learning new things. I would definitely recommend him to anyone looking for someone with good digital marketing skills and a strong work ethic.",
    ],
  },
  {
    name: "Mariam Zulfiqar",
    headline:
      "HR Leader & Talent Acquisition Specialist | Full-Cycle Recruitment & Strategic HR Management | Workforce Planning, Employee Relations & Career Development | Driving Organizational Growth Through People",
    relation: "Worked together on the same team",
    date: "October 28, 2025",
    text: [
      "I had the pleasure of working with Muhammad Umair Tarar at TECH-HUB Innovation Center, Faisalabad, where he served as a Digital Marketing Specialist. Umair played an important role in improving our company's online presence through his expertise in Social Media Marketing and SEO.",
      "During his time with us, he successfully managed our social media accounts, increased engagement, and helped strengthen our website's visibility through effective SEO strategies. His creativity, professionalism, and dedication truly made a positive impact on our marketing performance.",
      "I highly recommend Muhammad Umair Tarar for any organization looking for a skilled and result-driven digital marketing professional.",
    ],
  },
  {
    name: "Muiz Asif",
    headline:
      "Tech Entrepreneur | IT & AI Educator | Building Teams, Technology & Businesses | Helping People Turn Skills Into Careers",
    relation: "Worked together on the same team",
    date: "October 27, 2025",
    text: [
      "I had the opportunity to work with Muhammad Umair Tarar at TECH-HUB Innovation Center, Faisalabad, where he served as a Social Media Marketing Specialist. Umair did an excellent job managing our social media platforms and creating engaging campaigns that helped boost our brand's visibility and audience interaction.",
      "He consistently brought creative ideas, strategic planning, and attention to detail to every project. His work made a noticeable impact on our social media presence and overall engagement.",
      "I highly recommend Muhammad Umair Tarar to any organization looking for a skilled and dedicated Social Media Marketing professional.",
    ],
  },
  {
    name: "Fatima Tarar",
    headline:
      "AI-Powered LinkedIn Growth System for Founders | Ghostwriting + Profile Optimization (DFY) | DM me “LEADS”",
    relation: "Worked together on the same team",
    date: "October 18, 2025",
    text: [
      "I worked with Umair on social media marketing projects, and he did an amazing job. His posts were creative, engaging, and helped the brand grow fast. He always delivered work on time and communicated clearly. I highly recommend him for any social media marketing work!",
    ],
  },
];
