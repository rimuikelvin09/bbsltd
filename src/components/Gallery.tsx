"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  category: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

const ITEMS_PER_PAGE = 10;

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const categories = [
    "bungalow",
    "eps panels",
    "exterior",
    "flats",
    "interior",
    "maisonettes",
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(images);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Update filtered images when categories change
  useEffect(() => {
    setFilteredImages(
      selectedCategories.length === 0
        ? images
        : images.filter((image) => selectedCategories.includes(image.category))
    );
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [selectedCategories, images]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Open/close modal
  const openModal = (image: GalleryImage) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  // Pagination logic
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle page navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="py-16 bg-gray-50" aria-label="Image Gallery">
      <div className="max-w-screen-lg mx-auto px-6">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 overflow-x-auto whitespace-nowrap justify-center md:justify-center sm:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-[#991212] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategories([])}
            className="inline-flex px-4 py-2 rounded-full text-sm font-semibold border-2 border-[#991212] text-[#991212] bg-transparent hover:bg-[#991212] hover:text-white transition-colors"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                className="relative w-full h-64 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openModal(image)}
              >
                <Image
                  src={`/images/gallery/${image.category}/${image.src}`}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover rounded-lg shadow-md"
                  loading={index < 6 ? "eager" : "lazy"}
                  priority={index < 3}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#991212] text-white hover:bg-[#b91c1c]"
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="flex items-center text-sm font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#991212] text-white hover:bg-[#b91c1c]"
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}

        {/* Modal for Enlarged Image */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
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
                  src={`/images/gallery/${selectedImage.category}/${selectedImage.src}`}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                  priority
                />
                <button
                  onClick={closeModal}
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
      </div>
    </section>
  );
};

export default Gallery;
