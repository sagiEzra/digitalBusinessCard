import React from 'react';
import styles from './mapEmbed.module.css';

interface MapEmbedProps {
    mapsLink: string
}

export const MapEmbed: React.FC<MapEmbedProps> = ({mapsLink}) => {
    return (
        <div className={styles.mapContainer}>
            <h2 className={styles.mapTitle}>התקשרו, נקבע פגישה - וניפגש במשרד ! 📌</h2>
            <iframe
                className={styles.map}
                src={mapsLink}
                allowFullScreen={true}
                loading="lazy"
            ></iframe>
        </div>
    );
};