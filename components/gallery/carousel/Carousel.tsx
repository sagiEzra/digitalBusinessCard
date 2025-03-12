import React from 'react';
import Slider from "react-slick";
import { Card, CardMedia, Box } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Carousel.module.css';
// import './carouselOverrides.css'; // Adjust path accordingly


interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Slide speed
    slidesToShow: 1, // One image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in milliseconds
  };

  return (
    <Box className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Card key={index} className={styles.card}>
            <CardMedia
              component="img"
              image={src}
              alt={`Image ${index}`}
              loading='lazy'
              sx={{
                height: {
                  xs: 250, // height for extra-small screens
                  sm: 300, // height for small screens
                  md: 400, // height for medium screens
                  lg: 500, // height for large screens
                },
                objectFit: 'cover',
              }}
            />
          </Card>
        ))}
      </Slider>
    </Box>
  );
};