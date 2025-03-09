import React from 'react';
import styles from './coverMainImages.module.css';

interface CoverMainImageProps {
  coverImage: string;
  mainPhoto: string;
  mainPhotoSize?: "m" | "l" | "xl";
  mainPhotoBorderColor?: string;
  showDecorativeLines?: boolean;
}

export const CoverMainImage: React.FC<CoverMainImageProps> = ({ coverImage, mainPhoto, mainPhotoSize= 'xl', mainPhotoBorderColor = '#fff', showDecorativeLines = false }) => {
  return (
    <div className={styles.coverMainImage}>
      <div className={styles.coverImageContainer}>
        <img className={styles.coverImage} src={coverImage} alt="Cover" />
        {showDecorativeLines && <div className={styles.decorativeLine}></div>}
      </div>
      <div className={`${styles.mainPhotoContainer} ${styles[mainPhotoSize]}`} style={{ borderColor: mainPhotoBorderColor }}>
        <img className={styles.mainPhoto} src={mainPhoto} alt="Main" />
      </div>
    </div>
  );
};