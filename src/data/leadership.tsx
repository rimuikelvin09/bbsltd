import {
  FiTool,
  FiCheckCircle,
  FiEye,
  FiBriefcase,
  FiCompass,
  FiUsers,
  FiBook,
  FiBarChart,
} from "react-icons/fi";
import { ILeadership } from "@/types";

export const leaders: ILeadership[] = [
  {
    title: "Meet Alice Karanja",
    description:
      "Alice Karanja is the Managing Director of BBS, providing strategic oversight for administration, financial operations, and crucial stakeholder engagement. With over 20 years of robust experience in sales and business management, she is a results-oriented leader who ensures precision and efficiency in all undertakings.",
    bullets: [
      {
        title: "Results-Oriented Business Management",
        description:
          "With two decades of experience, she expertly manages business operations, delivering precise and impactful results.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "Strategic Leadership & Operational Excellence",
        description:
          "She provides clear strategic direction, ensuring smooth and efficient operations across all company departments.",
        icon: <FiCompass size={26} />,
      },
      {
        title: "Effective Stakeholder & Relationship Management",
        description:
          "She excels at cultivating and managing strong relationships with key partners and stakeholders, fostering collaboration and growth.",
        icon: <FiUsers size={26} />,
      },
    ],
    imageSrc: "/images/akaranja.jpg",
  },
  {
    title: "Meet Joseph Gachinga",
    description:
      "Joseph Gachinga is the Technical Director at BBS, bringing over 30 years of certified experience in Building and Civil Engineering. He expertly oversees all technical aspects of construction processes, from initial architectural designs to stringent quality management and successful project execution.",
    bullets: [
      {
        title: "Technical Expertise & Project Execution",
        description:
          "Mr. Gachinga's extensive experience ensures the seamless and successful execution of diverse construction projects from start to finish.",
        icon: <FiTool size={26} />,
      },
      {
        title: "Rigorous Quality Management",
        description:
          "He is dedicated to maintaining the highest standards of quality and precision throughout every phase of the construction process.",
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: "Nationwide Project Supervision",
        description:
          "Mr. Gachinga has successfully supervised numerous large-scale private and government construction projects across the nation.",
        icon: <FiEye size={26} />,
      },
    ],
    imageSrc: "/images/jgachinga.jpg",
  },

  {
    title: "Meet Dobson Waweru",
    description:
      "Dobson Waweru is the Sales, Marketing & Business Development Director at BBS, driving market expansion, strategic partnerships, and revenue growth. With 8+ years in direct sales management, he combines business strategy with financial expertise to strengthen Benchmark’s industry presence. He holds an LLB from the University of Nairobi, with additional training in Economics and Finance from Kenyatta University.",
    bullets: [
      {
        title: "Market Expansion & Brand Positioning",
        description:
          "He drives the company's marketing efforts to strenghten the company's presence and visibility.",
        icon: <FiBarChart size={26} />,
      },
      {
        title: "Strategic Partnerships & Revenue Growth",
        description:
          "He cultivates collaborations that drive business success and creates bigger impact.",
        icon: <FiUsers size={26} />,
      },
      {
        title: "Business & Financial Acumen",
        description:
          "He leverages his legal and financial expertise for strategic decision-making.",
        icon: <FiBook size={26} />,
      },
    ],
    imageSrc: "/images/dwaweru.jpg",
  },
];
