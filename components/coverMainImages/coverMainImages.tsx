import React from 'react';
import styles from './CoverMainImages.module.css';

interface CoverMainImageProps {
  coverImage: string;
  mainPhoto: string;
  mainPhotoBorderColor?: string;
  showDecorativeLines?: boolean;
}

const CoverMainImage: React.FC<CoverMainImageProps> = ({ coverImage, mainPhoto, mainPhotoBorderColor = '#fff', showDecorativeLines = false }) => {
  return (
    <div className={styles.coverMainImage}>
      <div className={styles.coverImageContainer}>
        <img className={styles.coverImage} src={coverImage} alt="Cover" />
        {showDecorativeLines && <div className={styles.decorativeLine}></div>}
      </div>
      <div className={styles.mainPhotoContainer} style={{ borderColor: mainPhotoBorderColor }}>
        <img className={styles.mainPhoto} src={mainPhoto} alt="Main" />
      </div>
    </div>
  );
};

export default CoverMainImage;