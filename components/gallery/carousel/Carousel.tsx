import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images, autoPlay = true, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.imageWrapper} ${index === currentIndex ? styles.active : ''}`}
          >
            <img src={image} alt={`Slide ${index}`} className={styles.image} />
          </div>
        ))}
        <button className={styles.prev} onClick={handlePrev}>
          <FaChevronRight />
        </button>
        <button className={styles.next} onClick={handleNext}>
          <FaChevronLeft />
        </button>
      </div>
      {images.length <= 12 && <div className={styles.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
      }
    </div>
  );
};