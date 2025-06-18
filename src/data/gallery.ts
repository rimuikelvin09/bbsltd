import fs from "fs";
import path from "path";

const galleryDir = path.join(process.cwd(), "public/images/gallery");

// Function to scan image folders dynamically
export const getGalleryImages = () => {
  const categories = fs.readdirSync(galleryDir); // ✅ Auto-detect folders
  const images: { src: string; category: string; alt: string }[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(galleryDir, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      // ✅ Ensure it's a folder
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => /\.(jpg|jpeg|png|webp|svg)$/i.test(file)); // ✅ Filter images

      files.forEach((file) => {
        images.push({
          src: file,
          category,
          alt: `${category} image`,
        });
      });
    }
  });

  return images;
};
