import React from 'react';
import Carousel from './carousel/Carousel';

interface GalleryProps {
    images: string[];
    galleryType?: 'carousel' | 'grid' | 'slider' | 'mosaic';
    additionalProps?: any; // add any additional props that are specific to the gallery type
}

export const Gallery: React.FC<GalleryProps> = ({images, galleryType='carousel'}) => {
    const getChoosenGallery = () => {
        switch (galleryType) {
            case 'carousel':
                return <Carousel images={images} />;
            // case 'grid':
            //     return <Grid images={images} />;
            // case 'slider':
            //     return <Slider images={images} />;
            // case 'mosaic':
            //     return <Mosaic images={images} />;
            default:
                return <Carousel images={images} />;
        }
    }
    
    return (
        getChoosenGallery()
    );
};