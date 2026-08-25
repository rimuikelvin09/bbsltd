"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const {
    title = "Untitled Project",
    description = "No description available",
    client = "Unknown Client",
    typeOfContract = "N/A",
    location = "Unknown Location",
    videoUrl = "",
    files,
  } = project;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Open/close modals
  const openImageModal = (imageUrl: string) => {
    setIsGalleryOpen(false); // Close gallery modal before opening image modal
    setSelectedImage(imageUrl);
  };
  const closeImageModal = () => setSelectedImage(null);
  const openVideoModal = (videoUrl: string) => setSelectedVideo(videoUrl);
  const closeVideoModal = () => setSelectedVideo(null);
  const openGalleryModal = () => setIsGalleryOpen(true);
  const closeGalleryModal = () => setIsGalleryOpen(false);

  // Effect to disable/enable body scrolling
  useEffect(() => {
    if (selectedImage || selectedVideo || isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to re-enable scrolling when component unmounts or modals close
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, selectedVideo, isGalleryOpen]);

  // Animation variants for sliding effect
  const childVariants = {
    offscreen: {
      opacity: 0,
      x: index % 2 === 0 ? 50 : -50,
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", bounce: 0.2, duration: 1 },
    },
  };

  // Text Section Component
  const TextSection = () => (
    <div className="flex flex-col justify-center text-left w-full lg:w-1/2 space-y-4">
      <div>
        <p className="eyebrow">
          {typeOfContract}
        </p>
      </div>
      <div className="w-24 h-0.5 bg-red-700 my-1"></div>
      <div>
        <span className="eyebrow eyebrow-muted">
          Project Title
        </span>
        <h2 className="text-[#212466] capitalize">
          {title}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-8">
        <div className="flex-1">
          <span className="eyebrow eyebrow-muted">
            Client Name
          </span>
          <p className="text-sm font-medium text-[#212466]">{client}</p>
        </div>
        <div className="flex-1">
          <span className="eyebrow eyebrow-muted">
            Location
          </span>
          <p className="text-sm font-medium text-[#212466]">{location}</p>
        </div>
      </div>
      <div>
        <span className="eyebrow eyebrow-muted">
          Scope of Work
        </span>
        <p className="text-base text-gray-700 leading-relaxed">{description}</p>
        <div className="mt-2 flex flex-col sm:flex-row sm:gap-4">
          {videoUrl && (
            <button
              onClick={() => openVideoModal(videoUrl)}
              className="inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-[#991212] text-white hover:bg-[#b91c1c] transition-colors"
              aria-label={`Watch video for ${title}`}
            >
              Watch Now
            </button>
          )}
          {files && (
            <button
              onClick={openGalleryModal}
              className="inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-[#212466] text-white hover:bg-[#2d3a8c] transition-colors"
              aria-label={`View gallery for ${title}`}
            >
              View Gallery
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Media Section Component
  const MediaSection = () =>
    files?.finishing?.fileType === "IMAGE" && files?.finishing?.fileUrl ? (
      <div
        className="relative overflow-hidden rounded-lg shadow-md w-full lg:w-1/2 h-80 lg:h-96 cursor-pointer"
        onClick={() => openImageModal(files.finishing.fileUrl)}
      >
        <Image
          src={files.finishing.fileUrl}
          alt={`${title} - finishing`}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ) : null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        className={`bg-white/95 backdrop-blur-md border border-gray-200 p-6 shadow-sm flex flex-col lg:flex-row gap-8 ${
          index % 2 === 0 ? "" : "lg:flex-row-reverse"
        }`}
        variants={childVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TextSection />
        <MediaSection />
      </motion.div>

      {/* Modal for Enlarged Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            // Changed z-60 to z-[999] for a very high z-index
            // Changed bg-black/50 to bg-[#21246638] for consistent blur background with gallery
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#21246638] backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-3xl w-full mx-auto bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={title}
                width={1200}
                height={800}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
              />
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-[#991212] z-10"
                aria-label="Close image modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Video Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            // Changed z-60 to z-[999] for a very high z-index
            // Changed bg-black/50 to bg-[#21246638] for consistent blur background with gallery
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#21246638] backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-auto bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={selectedVideo
                  .replace("youtube.com/shorts/", "youtube.com/embed/")
                  .replace("?feature=share", "")}
                title={`Video for ${title}`}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 text-[#991212] z-10"
                aria-label="Close video modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Gallery */}
      <AnimatePresence>
        {isGalleryOpen && files && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#21246638] backdrop-blur-md p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGalleryModal}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-auto bg-white/0 rounded-lg overflow-hidden p-4 sm:p-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { stage: "D", file: files.finishing, label: "Finishing" },
                  { stage: "C", file: files.roofing, label: "Roofing" },
                  { stage: "B", file: files.walling, label: "Walling" },
                  { stage: "A", file: files.foundation, label: "Foundation" },
                ].map(
                  ({ stage, file, label }) =>
                    file?.fileUrl &&
                    file?.fileType === "IMAGE" && (
                      <div
                        key={stage}
                        className="relative h-64 cursor-pointer group"
                        onClick={() => openImageModal(file.fileUrl)}
                      >
                        <Image
                          src={file.fileUrl}
                          alt={`${title} - ${label}`}
                          fill
                          className="object-cover rounded-lg group-hover:brightness-75 transition-brightness duration-300"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-lg">
                          <span className="text-white font-semibold text-lg capitalize">
                            {label}
                          </span>
                        </div>
                      </div>
                    )
                )}
              </div>
              <button
                onClick={closeGalleryModal}
                className="absolute top-4 right-4 text-[#991212] z-10"
                aria-label="Close gallery modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProjectListingProps {
  /** Supplied by the page, which reads them on the server. */
  projects: Project[];
}

const ProjectListing: React.FC<ProjectListingProps> = ({ projects }) => {
  return (
    <section id="project-listings" className="py-4 bg-gray-50">
      <Container>
        <div className="relative z-10 container py-16">
          {projects.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 max-w-xl mx-auto">
              We are rebuilding our project archive. In the meantime, browse
              the gallery below or get in touch to see recent work.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProjectListing;
