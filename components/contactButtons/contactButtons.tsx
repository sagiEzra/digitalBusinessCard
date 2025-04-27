import React, { useEffect, useRef, useState } from 'react';
import styles from './contactButtons.module.css';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaEnvelope, FaWaze, FaPlus, FaHome } from 'react-icons/fa';

interface ContactButtonsProps {
    name: string,
    contact: any,
}

export const ContactButtons: React.FC<ContactButtonsProps> = (attrs) => {
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

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
            <a
                onClick={(e) => {
                    e.preventDefault();
                    if (attrs.contact.phone2) {
                        setShowPhoneModal(true);
                    } else {
                        window.location.href = `tel:${attrs.contact.phone}`;
                    }
                }}
                href={`tel:${attrs.contact.phone}`}
                className={styles.button}
                key="phone"
            >
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
        attrs.contact.catalog && (
            <a href={attrs.contact.whatsapp} className={styles.button} key="catalog">
                <FaHome className={styles.icon} />
                <span>קטלוג</span>
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


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowPhoneModal(false);
            }
        };

        if (showPhoneModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPhoneModal]);

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

            {showPhoneModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent} ref={modalRef}>
                        <button onClick={() => setShowPhoneModal(false)} className={styles.closeButton}>×</button>
                        <h2>התקשר</h2>
                        <div className={styles.phoneNumbers}>
                            <a href={`tel:${attrs.contact.phone}`} className={styles.phoneNumber}>
                                <FaPhone className={styles.icon} />
                                <span>{attrs.name || 'מספר ראשי'}</span>
                            </a>
                            {attrs.contact.phone2 && (
                                <a href={`tel:${attrs.contact.phone2}`} className={styles.phoneNumber}>
                                    <FaPhone className={styles.icon} />
                                    <span>{attrs.contact.phone2Name || 'מספר נוסף'}</span>
                                </a>
                            )}
                            {attrs.contact.phone3 && (
                                <a href={`tel:${attrs.contact.phone3}`} className={styles.phoneNumber}>
                                    <FaPhone className={styles.icon} />
                                    <span>{attrs.contact.phone3Name || 'מספר נוסף'}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};