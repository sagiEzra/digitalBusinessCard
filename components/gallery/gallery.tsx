import React from 'react';
import { Carousel } from './carousel/Carousel';
import { MasonryGallery } from './moasic/moasic';

interface GalleryProps {
    images: string[];
    galleryType?: 'carousel' | 'mosaic';
    additionalProps?: any; // add any additional props that are specific to the gallery type
}

export const Gallery: React.FC<GalleryProps> = ({images, galleryType='carousel'}) => {
    const getChoosenGallery = () => {
        switch (galleryType) {
            case 'carousel':
                return <Carousel images={images} />;
            case 'mosaic':
                return <MasonryGallery images={images} />;
            default:
                return <Carousel images={images} />;
        }
    }
    
    return (
        getChoosenGallery()
    );
};