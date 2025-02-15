import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(images.length / 3) - 1 ? 0 : prevIndex + 1)),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(images.length / 3) - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(images.length / 3) - 1 : prevIndex - 1));
  };

  const getImagesForCurrentIndex = () => {
    const startIndex = currentIndex * 3;
    return images.slice(startIndex, startIndex + 3);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner} style={{ transform: `-translateX(${currentIndex * 100}%)` }}>
        {getImagesForCurrentIndex().map((image, index) => (
          <div className={styles.carouselItem} key={index}>
            <img className={styles.carouselImage} src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className={styles.carouselButton} onClick={nextSlide}>
        &#10095;
      </button>
      <button className={styles.carouselButton} onClick={prevSlide}>
        &#10094;
      </button>
    </div>
  );
};

export default Carousel;