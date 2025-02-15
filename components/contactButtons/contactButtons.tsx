import React from 'react';
import styles from './contactButtons.module.css';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaEnvelope, FaWaze, FaPlus } from 'react-icons/fa';

interface ContactButtonsProps {
    name: string,
    contact: any,
    mainColor?: string,
    secondaryColor?: string,
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({ mainColor = '#0b3c74', secondaryColor = '#fff', ...attrs }) => {

    const handleDownloadContact = () => {
        const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${attrs.name}\nTEL:${attrs.contact.phone}\nEMAIL:${attrs.contact.email}\nURL:${attrs.contact.website}\nEND:VCARD`;
        const blob = new Blob([vCardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <React.Fragment>
            <div className={styles.socialLinks}>

                <div className={styles.row}>
                    <a href={attrs.contact.whatsapp} className={styles.button}>
                        <FaWhatsapp className={styles.icon} />
                        <span>וואטסאפ</span>
                    </a>
                    <a href={`tel:${attrs.contact.phone}`} className={styles.button}>
                        <FaPhone className={styles.icon} />
                        <span>התקשר</span>
                    </a>
                    <a href={attrs.contact.facebook} className={styles.button}>
                        <FaFacebook className={styles.icon} />
                        <span>פייסבוק</span>
                    </a>
                </div>

                <div className={styles.row}>
                    {/* <a href={data.contact.website} className={styles.button}>
                        <FaGlobe className={styles.icon} />
                        <span>אתר</span>
                    </a> */}
                    <a href={attrs.contact.instagram} className={styles.button}>
                        <FaInstagram className={styles.icon} />
                        <span>אינסטגרם</span>
                    </a>
                    <a href={`mailto:${attrs.contact.email}`} className={styles.button}>
                        <FaEnvelope className={styles.icon} />
                        <span>אימייל</span>
                    </a>
                    <a href={attrs.contact.waze} className={styles.button}>
                        <FaWaze className={styles.icon} />
                        <span>ווייז</span>
                    </a>
                </div>

            </div>

            <button onClick={handleDownloadContact} className={styles.addContactButton} style={{ borderColor: mainColor }}>
                <span>שמרו אותי באנשי הקשר</span>
                <FaPlus className={styles.plusIcon} />
            </button>
        </React.Fragment>
    );
};