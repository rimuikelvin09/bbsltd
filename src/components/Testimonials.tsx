import React from "react";
import Container from "./Container";
import VideoRail from "./VideoRail";
import TestimonialCard from "./TestimonialCard";
import { getPlaylistVideos } from "@/lib/youtube";

/**
 * Client voices, straight from the YouTube playlist.
 *
 * A SERVER component now. It fetches on the server during the build or a
 * revalidation, so the cards are in the HTML before any JavaScript runs -
 * which is what makes them visible to search engines, and what stops the
 * section being blank in local development.
 *
 * If YouTube returns nothing, the whole section renders nothing. An empty
 * carousel with working arrows is worse than no section at all.
 */
const Testimonials: React.FC = async () => {
  const videos = await getPlaylistVideos();

  if (!videos.length) return null;

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="surface-light w-full py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="eyebrow">In their words</p>
          <h2 className="mt-5">Clients who have been through it.</h2>
        </div>

        <VideoRail label="Client testimonial videos">
          {videos.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.videoId}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </VideoRail>
      </Container>
    </section>
  );
};

export default Testimonials;
