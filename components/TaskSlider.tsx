"use client";

// components/TaskSlider.tsx
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Using lucide-react for icons

// 1. Define the type for a single slide object
interface Slide {
  caption: string;
  imageUrl: string;
}

// 2. Define the data array using the Slide type
const slides: Slide[] = [
  {
    caption: "Two easy steps to get started using TaskFlow",
    imageUrl: "/slideOneImage.jpg",
  },
  {
    caption: "Sign-up or Sign-in to get started",
    imageUrl: "/slideTwoImage.jpg",
  },
  {
    caption:
      "Tap on 'My Tasks' on the Navbar to Create, update and delete tasks",
    imageUrl: "/slideThreeImage.jpg",
  },
];

// Define the functional component type
const TaskSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3. Type the useRef hook for a DOM element (HTMLDivElement)
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;

  /**
   * Scrolls the slider container to the target slide index.
   * @param index - The index of the slide to scroll to.
   */
  const scrollToSlide = (index: number) => {
    // TypeScript check: Ensure sliderRef.current is not null before accessing its properties
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  /**
   * Navigates to the next slide.
   */
  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    scrollToSlide(nextIndex);
  };

  /**
   * Navigates to the previous slide.
   */
  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    scrollToSlide(prevIndex);
  };

  return (
    <div className="relative w-full max-w-4xl  mx-auto shadow-2xl rounded-xl overflow-hidden ">
      {/* --- Slider Container (Scrollable Area) --- */}
      <div
        // 4. Assign the ref to the div
        ref={sliderRef}
        className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth h-[500px] md:h-[600px] lg:h-[700px] scrollbar-hide "
      >
        {slides.map((slide: Slide, index: number) => (
          <div
            key={index}
            className="w-full shrink-0 snap-center relative"
            style={{ width: "100%" }}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* Dark Overlay for better caption readability */}
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            {/* Caption Content */}
            <div className="relative z-10 flex items-center justify-center h-full p-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center drop-shadow-lg leading-tight">
                {slide.caption}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- Navigation Arrows --- */}
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition duration-300 backdrop-blur-sm z-20 focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition duration-300 backdrop-blur-sm z-20 focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* --- Navigation Dots (Indicators) --- */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index: number) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskSlider;
