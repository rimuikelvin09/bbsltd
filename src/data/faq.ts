import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: "How long will my construction project take?",
    answer: `The duration of your project depends on its scope, size, and complexity. At ${siteDetails.siteName}, we provide a detailed timeline during the planning phase, factoring in design, permitting, and construction stages. For example, a residential home may take 6-12 months, while commercial projects could range from 12-24 months. We prioritize efficiency without compromising quality and keep you informed of any adjustments.`,
  },
  {
    question: "How do you determine the cost of a project?",
    answer: `At ${siteDetails.siteName}, we provide transparent cost estimates based on your project’s specifications, including materials, labor, permits, and site conditions. After an initial consultation and site assessment, we deliver a detailed quote outlining all expenses. We also discuss potential contingencies to ensure no surprises. Our goal is to align costs with your budget while delivering exceptional value.`,
  },
  {
    question: "How do you ensure the quality of materials and workmanship?",
    answer: `${siteDetails.siteName} is committed to excellence. We source materials from trusted suppliers that meet industry standards and are NCA-accredited for quality assurance. Our skilled team undergoes regular training, and every project is supervised by experienced managers to ensure precision and durability. We also conduct inspections at key stages to guarantee compliance with your vision and regulatory requirements.`,
  },
  {
    question: "Do you handle permits and compliance with local regulations?",
    answer: `Yes, we take care of all necessary permits and ensure compliance with local building codes and regulations. ${siteDetails.siteName} has extensive experience navigating municipal requirements, and our team coordinates with relevant authorities to secure approvals efficiently. This allows you to focus on your vision while we handle the paperwork and legalities.`,
  },
  {
    question: "How do you keep me updated on project progress?",
    answer: `Communication is a priority at ${siteDetails.siteName}. We assign a dedicated project manager to your project who provides regular updates via your preferred method—email, phone, or in-person meetings. You’ll receive progress reports, photos, and milestone updates, and we’re always available to address questions. Our transparent approach ensures you’re informed every step of the way.`,
  },
  {
    question: "What kind of support do you offer after project completion?",
    answer: `${siteDetails.siteName} stands by our work. We offer a warranty period for all projects, covering defects in materials or workmanship. Additionally, our team provides maintenance advice to keep your property in top condition. If you need renovations or further assistance, we’re just a call away, ready to support your long-term needs.`,
  },
];
