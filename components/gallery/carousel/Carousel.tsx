import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  autoScrollTime?: number; // time in seconds
  imageTransitionType?: 'opacity' | 'slide' | 'scale' | 'rotate';
  transitionDuration?: number; // duration in seconds
}

const Carousel: React.FC<CarouselProps> = ({ images, autoScrollTime = 3, imageTransitionType = 'scale', transitionDuration = 0.5 }) => {
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
      () => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)),
      autoScrollTime * 1000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const getTransitionClass = () => {
    switch (imageTransitionType) {
      case 'slide':
        return styles.transitionSlide;
      case 'scale':
        return styles.transitionScale;
      case 'rotate':
        return styles.transitionRotate;
      default:
        return styles.transitionOpacityEaseInOut;
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageContainer}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.imageWrapper} ${getTransitionClass()} ${index === currentIndex ? styles.active : ''}`}
            style={{ transitionDuration: `${transitionDuration}s` }}
          >
            <img src={src} alt={`Slide ${index}`} className={styles.image} />
          </div>
        ))}
      </div>
      <button className={styles.prev} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={styles.next} onClick={nextSlide}>
        &#10095;
      </button>
      {/* <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;