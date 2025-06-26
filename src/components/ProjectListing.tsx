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
        <p className="text-sm font-medium text-red-700 uppercase tracking-wider">
          {typeOfContract}
        </p>
      </div>
      <div className="w-24 h-0.5 bg-red-700 my-1"></div>
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Project Title
        </span>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#212466] capitalize">
          {title}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-8">
        <div className="flex-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Client Name
          </span>
          <p className="text-sm font-medium text-[#212466]">{client}</p>
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Location
          </span>
          <p className="text-sm font-medium text-[#212466]">{location}</p>
        </div>
      </div>
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
        className={`bg-white/95 backdrop-blur-md border border-gray-200 p-8 shadow-sm flex flex-col lg:flex-row gap-8 ${
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
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-3xl w-full mx-4 bg-white rounded-lg overflow-hidden"
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
                className="absolute top-4 right-4 text-[#991212]"
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
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4 bg-white rounded-lg overflow-hidden"
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
                className="w-full h-[500px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 text-[#991212]"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#21246638] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGalleryModal}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4 bg-white/0  overflow-hidden p-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { stage: "D", file: files.finishing },
                  { stage: "C", file: files.roofing },
                  { stage: "B", file: files.walling },
                  { stage: "A", file: files.foundation },
                ].map(({ stage, file }) => (
                  <div
                    key={stage}
                    className="relative h-64 cursor-pointer group"
                    onClick={() => openImageModal(file.fileUrl)}
                  >
                    <Image
                      src={file.fileUrl}
                      alt={`${title} - ${stage}`}
                      fill
                      className="object-cover rounded-lg group-hover:brightness-75 transition-brightness duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-lg">
                      <span className="text-white font-semibold text-lg capitalize">
                        {stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={closeGalleryModal}
                className="absolute top-4 right-4 text-[#991212]"
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

const ProjectListing: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/portfolio-items");
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <section id="project-listings" className="py-4 bg-gray-50">
      <Container>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectListing;
