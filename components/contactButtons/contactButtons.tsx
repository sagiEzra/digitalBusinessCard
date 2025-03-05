import React from 'react';
import styles from './contactButtons.module.css';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaEnvelope, FaWaze, FaPlus } from 'react-icons/fa';

interface ContactButtonsProps {
    name: string,
    contact: any,
}

export const ContactButtons: React.FC<ContactButtonsProps> = (attrs) => {

    const handleDownloadContact = () => {
        const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${attrs.name}\nTEL:${attrs.contact.phone}\n${attrs.contact.phone2 ? `TEL:${attrs.contact.phone2}\n` : ''}EMAIL:${attrs.contact.email}\nURL:${attrs.contact.website}\nEND:VCARD`;
        const blob = new Blob([vCardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const contactLinks = [
        attrs.contact.whatsapp && (
            <a href={attrs.contact.whatsapp} className={styles.button} key="whatsapp">
                <FaWhatsapp className={styles.icon} />
                <span>וואטסאפ</span>
            </a>
        ),
        attrs.contact.phone && (
            <a href={`tel:${attrs.contact.phone}`} className={styles.button} key="phone">
                <FaPhone className={styles.icon} />
                <span>התקשר</span>
            </a>
        ),
        attrs.contact.facebook && (
            <a href={attrs.contact.facebook} className={styles.button} key="facebook">
                <FaFacebook className={styles.icon} />
                <span>פייסבוק</span>
            </a>
        ),
        attrs.contact.instagram && (
            <a href={attrs.contact.instagram} className={styles.button} key="instagram">
                <FaInstagram className={styles.icon} />
                <span>אינסטגרם</span>
            </a>
        ),
        attrs.contact.email && (
            <a href={`mailto:${attrs.contact.email}`} className={styles.button} key="email">
                <FaEnvelope className={styles.icon} />
                <span>אימייל</span>
            </a>
        ),
        attrs.contact.waze && (
            <a href={attrs.contact.waze} className={styles.button} key="waze">
                <FaWaze className={styles.icon} />
                <span>ווייז</span>
            </a>
        ),
    ].filter(Boolean);

    const rows = [];
    for (let i = 0; i < contactLinks.length; i += 3) {
        rows.push(contactLinks.slice(i, i + 3));
    }

    return (
        <React.Fragment>
            <div className={styles.socialLinks}>
                {rows.map((row, index) => (
                    <div className={styles.row} key={index}>
                        {row}
                    </div>
                ))}
            </div>

            <button onClick={handleDownloadContact} className={styles.addContactButton}>
                <span>שמרו אותי באנשי הקשר</span>
                <FaPlus className={styles.plusIcon} />
            </button>
        </React.Fragment>
    );
};