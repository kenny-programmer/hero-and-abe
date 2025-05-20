import { Card, CardContent } from "@/components/ui/card";
import { Share2, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC, useEffect, useRef, useState, useCallback } from "react";

const CustomSocialHashtags: FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = [
    "/lovable-uploads/b5e268ed-a6b7-4bc4-b9db-de154ff527e7.png",
    "/lovable-uploads/3c3afc5b-7ebd-4dd0-8728-41bd35554a43.png",
    "/lovable-uploads/abf82647-259c-43a6-a6c0-2a9e7fd7c3a5.png",
    "/lovable-uploads/496510680_1468972144267272_2396773876021707929_n.png",
  ];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000); //5 seconds interval
  }, [nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetAutoplay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const minSwipe = 50;

    if (Math.abs(distance) > minSwipe) {
      distance > 0 ? nextSlide() : prevSlide();
      resetAutoplay(); // Reset timer on manual interaction
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    direction === "next" ? nextSlide() : prevSlide();
    resetAutoplay(); // Reset timer on manual interaction
  };

  return (
    <section className="py-16 bg-wedding-secondary text-center">
      <div className="wedding-container">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <Camera className="h-10 w-10 text-wedding-primary" />
          </div>
          <h2 className="text-2xl font-bold font-cursive text-wedding-primary mb-4">
            Capture the Love
          </h2>

          <div className="mt-6 relative">
            <div
              className="overflow-hidden relative rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Slide images */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  width: `${images.length * 100}%`,
                  transform: `translateX(-${
                    currentImage * (100 / images.length)
                  }%)`,
                }}
              >
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Wedding Ceremony ${index + 1}`}
                    className="w-full h-auto flex-shrink-0 object-cover rounded-lg"
                    style={{ width: `${100 / images.length}%` }}
                  />
                ))}
              </div>

              {/* Custom Chevron Arrows */}
              <button
                onClick={() => handleArrowClick("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                     bg-white/60 hover:bg-white/90 
                     text-wedding-primary p-2 
                     rounded-full shadow-sm 
                     transition duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => handleArrowClick("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                     bg-white/60 hover:bg-white/90 
                     text-wedding-primary p-2 
                     rounded-full shadow-sm 
                     transition duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImage(index);
                      resetAutoplay();
                    }}
                    className={`w-3 h-3 rounded-full ${
                      currentImage === index
                        ? "bg-wedding-primary opacity-100"
                        : "bg-wedding-primary/50 opacity-50"
                    } transition-opacity duration-300`}
                  ></button>
                ))}
              </div>
            </div>

            <p className="mb-6 mt-6 text-wedding-text">
              Capture the love on our special day. Use our official hashtags for
              photos and videos you want to share.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Card className="border-2 border-wedding-primary/30">
                <CardContent className="p-4 flex items-center">
                  <span className="text-wedding-primary font-medium">
                    #ABElessingGivenGenHEROuslyByGod
                  </span>
                </CardContent>
              </Card>
              <Card className="border-2 border-wedding-primary/30">
                <CardContent className="p-4 flex items-center">
                  <span className="text-wedding-primary font-medium">
                    #ABEnigaySaAmingPaHEROngMaykapal
                  </span>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Share2 className="h-6 w-6 text-wedding-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSocialHashtags;
