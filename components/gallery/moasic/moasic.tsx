import { Masonry } from "@mui/lab";
import { Card, CardMedia } from "@mui/material";
import styles from './moasic.module.css';

interface MasonryGalleryProps {
    images: string[];
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
    return (
        <div className={styles.mosaic}>
            <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
                {images.map((src, index) => (
                    <Card key={index} sx={{ borderRadius: 2, overflow: "hidden" }}>
                        <CardMedia component="img" image={src} alt={`Image ${index}`} loading='lazy'/>
                    </Card>
                ))}
            </Masonry>
        </div>
    );
}
