
import { useEffect, useState } from 'react';

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
}

const BackgroundSlider = ({ images, interval = 5000 }: BackgroundSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only set up interval if there's more than one image
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 bg-no-repeat ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlider;
