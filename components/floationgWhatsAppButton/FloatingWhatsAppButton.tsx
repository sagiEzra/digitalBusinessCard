import React from 'react';
import styles from './FloatingWhatsAppButton.module.css';
import { FaWhatsapp } from 'react-icons/fa';

interface FloatingWhatsAppButtonProps {
    contact: any;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = (attrs) => {
  return (
    <div className={styles.floatingButton}>
      <a href={attrs.contact.whatsapp} target="_blank" rel="noopener noreferrer" >
        <FaWhatsapp className={styles.whatsappIcon} />
      </a>
      <div className={styles.waves}></div>
      <div className={`${styles.waves} ${styles.waves2}`}></div>
    </div>
  );
};