"use client";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchYouTubeVideos } from "@/fetchYouTubeVideos";
import TestimonialCard from "@/components/TestimonialCard";
import { ITestimonial } from "@/types";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    (async () => setTestimonials(await fetchYouTubeVideos()))();
  }, []);

  const settings = {
    infinite: true, // Enables looping
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1, // Required for centerMode
    autoplay: false, // Disable auto-scroll for manual control
    centerMode: true,
    centerPadding: "0px",
    arrows: false, // Disable default arrows since we'll use custom buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
    ],
  };

  return (
    <section className="py-16 screen relative" aria-label="Testimonials">
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#991212] text-white rounded-full z-10"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        ❮
      </button>

      <div className="carousel-wrapper mx-auto max-w-6xl">
        <Slider ref={sliderRef} {...settings} className="carousel-container">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.videoId}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </Slider>
      </div>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#991212] text-white rounded-full z-10"
        onClick={() => sliderRef.current?.slickNext()}
      >
        ❯
      </button>
    </section>
  );
};

export default Testimonials;
