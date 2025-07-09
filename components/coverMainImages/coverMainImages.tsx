import React from 'react';

interface CoverMainImageProps {
  coverImage: string;
  mainPhoto: string;
  mainPhotoSize?: "m" | "l" | "xl";
  mainPhotoBorderColor?: string;
  showDecorativeLines?: boolean;
  isMainPhotoOnTop?: boolean;
}

const mainPhotoSizeMap = {
  m: 'w-[160px] h-[160px] md:w-[120px] md:h-[120px]',
  l: 'w-[200px] h-[200px] md:w-[160px] md:h-[160px]',
  xl: 'w-[240px] h-[240px] md:w-[200px] md:h-[200px]',
};

export const CoverMainImage: React.FC<CoverMainImageProps> = ({
  coverImage,
  mainPhoto,
  mainPhotoSize = 'xl',
  mainPhotoBorderColor = '#fff',
  showDecorativeLines = false,
  isMainPhotoOnTop = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div className="min-w-[60%] max-w-[90%] flex flex-col items-center justify-center">
        <img
          className="w-full object-cover rounded-[12px] mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          src={coverImage}
          alt="Cover"
        />
        {showDecorativeLines && (
          <div className="w-full h-[2px] bg-black" />
        )}
      </div>
      <div
        className={`
          flex items-center justify-center
          border-[4px] rounded-full overflow-hidden bg-white shadow-[0_5px_20px_rgba(0,0,0,0.6)]
          ${mainPhotoSize === 'm' ? 'w-[140px] h-[140px] md:w-[100px] md:h-[100px] lg:w-[180px] lg:h-[180px]' : ''}
          ${mainPhotoSize === 'l' ? 'w-[180px] h-[180px] md:w-[140px] md:h-[140px] lg:w-[260px] lg:h-[260px]' : ''}
          ${mainPhotoSize === 'xl' ? 'w-[210px] h-[210px] md:w-[170px] md:h-[170px] lg:w-[320px] lg:h-[320px]' : ''}
          ${isMainPhotoOnTop ? 'mt-[-120px]' : 'mt-[-10px]'}
        `}
        style={{ borderColor: mainPhotoBorderColor }}
      >
        <img
          className="w-full h-full object-cover"
          src={mainPhoto}
          alt="Main"
        />
      </div>
    </div>
  );
};