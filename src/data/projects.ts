import { Project } from "@/types";

/**
 * PORTFOLIO / PROJECTS
 * --------------------
 * Source of truth for the project list on the /portfolio page.
 *
 * Each project carries four build-stage images -- foundation, walling,
 * roofing and finishing. The `finishing` image is used as the main card
 * image; all four appear in the "View Gallery" modal.
 *
 * IMAGES: put files in /public/images/projects/ and reference them as
 * "/images/projects/your-file.jpg". The old Spaces bucket URLs are dead.
 *
 * `videoUrl` is optional -- leave it as "" to hide the "Watch Now" button.
 * YouTube Shorts links are rewritten to embeds automatically.
 *
 * ---------------------------------------------------------------------
 * EXAMPLE ENTRY (copy this block inside the array below and edit it):
 *
 * {
 *   id: 1,
 *   title: "Four Bedroom Maisonette",
 *   client: "Client Name",
 *   typeOfContract: "Design & Build",
 *   location: "Kiambu, Kenya",
 *   description: "A paragraph describing the scope of work.",
 *   videoUrl: "",
 *   files: {
 *     foundation: { fileType: "IMAGE", fileUrl: "/images/projects/x-foundation.jpg" },
 *     walling:    { fileType: "IMAGE", fileUrl: "/images/projects/x-walling.jpg" },
 *     roofing:    { fileType: "IMAGE", fileUrl: "/images/projects/x-roofing.jpg" },
 *     finishing:  { fileType: "IMAGE", fileUrl: "/images/projects/x-finishing.jpg" },
 *   },
 * },
 * ---------------------------------------------------------------------
 */

export const projects: Project[] = [];
