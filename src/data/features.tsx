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
import { IFeature } from "@/types";

export const features: IFeature[] = [
  {
    title: "Track Your Projects on the Go",
    description:
      "Stay updated on your construction project’s progress anytime, anywhere, with real-time insights and notifications tailored to your needs.",
    bullets: [
      {
        title: "Real-Time Progress Updates",
        description:
          "Monitor every stage of your project with clear, visual progress indicators.",
        icon: <FiEye size={26} />,
      },
      {
        title: "Instant Notifications",
        description:
          "Receive automated updates on project milestones and status changes.",
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: "Mobile Access",
        description:
          "Access project details conveniently from your mobile device.",
        icon: <FiCompass size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup3.png",
  },
  {
    title: "Keep Track of Your Payments",
    description:
      "Easily monitor all financial aspects of your project, from invoices to payment statuses, ensuring transparency and control.",
    bullets: [
      {
        title: "Invoice Visibility",
        description: "View and manage invoices directly within the platform.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "Payment Tracking",
        description:
          "Track payment statuses and history for complete financial clarity.",
        icon: <FiBarChart size={26} />,
      },
      {
        title: "Secure Transactions",
        description: "Rest assured with secure handling of all financial data.",
        icon: <FiCheckCircle size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup.png",
  },
  {
    title: "All Your Documents in One Place",
    description:
      "Access and manage all project-related documents securely in a centralized platform, with easy upload and download capabilities.",
    bullets: [
      {
        title: "Centralized Document Hub",
        description:
          "Store and access drawings, contracts, and compliance documents in one place.",
        icon: <FiBook size={26} />,
      },
      {
        title: "Easy File Sharing",
        description:
          "Upload and download project files effortlessly to stay organized.",
        icon: <FiUsers size={26} />,
      },
      {
        title: "Feedback Integration",
        description:
          "Provide feedback directly on documents to streamline communication.",
        icon: <FiTool size={26} />,
      },
    ],
    imageSrc: "/images/features/mockup1.png",
  },
];
