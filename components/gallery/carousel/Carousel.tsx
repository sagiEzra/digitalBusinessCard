import React from 'react';
import Slider from "react-slick";
import { Card, CardMedia, Box } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images, autoPlay = true, autoPlayInterval = 3000 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: autoPlayInterval,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    cssEase: "cubic-bezier(0.77, 0, 0.175, 1)",
  };

  return (
    <Box
      className="
        max-w-full mx-auto mb-8 p-5 pb-10 bg-[#f9f9f9]
        rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative
      "
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <Card
            key={index}
            className="
              rounded-[10px] overflow-hidden transition-transform duration-300 ease-in-out shadow
              hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] focus:shadow-[0_8px_16px_rgba(0,0,0,0.2)]
              outline-none
            "
            tabIndex={0}
          >
            <CardMedia
              component="img"
              image={src}
              alt={`Image ${index}`}
              loading="lazy"
              sx={{
                height: {
                  xs: 250,
                  sm: 300,
                  md: 400,
                  lg: 500,
                },
                objectFit: 'cover',
                transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            />
          </Card>
        ))}
      </Slider>
    </Box>
  );
};