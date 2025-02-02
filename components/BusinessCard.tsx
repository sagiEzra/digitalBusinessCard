import React, { useState } from 'react';
import Head from 'next/head';
import styles from './BusinessCard.module.css';
import { FaGlobe, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaWaze, FaWhatsapp, FaPhone, FaPlus, FaChevronDown, FaChevronUp, FaFacebook } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface Props {
  data: {
    name: string;
    mainPhoto: string;
    gallery: string[];
    headerText: string;
    about: string;
    businessHours: string;
    contact: any;
    testimonials: any;
    sections: { subTitle: string; content: string }[];
    design: any;
    favicon: string
  };
}

export const BusinessCard: React.FC<Props> = ({ data }) => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  const handleToggleSection = (index: number) => {
    setOpenSections(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleDownloadContact = () => {
    const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTEL:${data.contact.phone}\nEMAIL:${data.contact.email}\nURL:${data.contact.website}\nEND:VCARD`;
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
    <div className={styles.card}>
      <Head>
        <title>{data.name}</title>

        // og tags
        <meta name="description" content={data.headerText} />
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.headerText} />
        <meta property="og:image" content={data.mainPhoto} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content={data.name} />
        <meta property="og:type" content="website" />

        //favicon
        <link rel="icon" href={data.favicon} />
        <link rel="shortcut icon" href={data.favicon} />
        <link rel="apple-touch-icon" href={data.favicon} />
      </Head>
      <div className={styles.header}>
        <img className={styles.mainPhoto} src={data.mainPhoto} alt="Main Photo" />
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.headerText}>{data.headerText}</p>
      </div>
      <div className={styles.socialLinks}>

        <div className={styles.row}>
          <a href={data.contact.whatsapp} className={styles.button}>
            <FaWhatsapp className={styles.icon} />
            <span>וואטסאפ</span>
          </a>
          <a href={`tel:${data.contact.phone}`} className={styles.button}>
            <FaPhone className={styles.icon} />
            <span>התקשר</span>
          </a>
          <a href={data.contact.facebook} className={styles.button}>
            <FaFacebook className={styles.icon} />
            <span>פייסבוק</span>
          </a>
        </div>

        <div className={styles.row}>
          <a href={data.contact.website} className={styles.button}>
            <FaGlobe className={styles.icon} />
            <span>אתר</span>
          </a>
          <a href={`mailto:${data.contact.email}`} className={styles.button}>
            <FaEnvelope className={styles.icon} />
            <span>אימייל</span>
          </a>
          <a href={data.contact.linkedin} className={styles.button}>
            <FaLinkedin className={styles.icon} />
            <span>לינקדאין</span>
          </a>
        </div>

        <div className={styles.row}>
          <a href={data.contact.maps} className={styles.button}>
            <FaMapMarkerAlt className={styles.icon} />
            <span>מפות</span>
          </a>
          <a href={data.contact.waze} className={styles.button}>
            <FaWaze className={styles.icon} />
            <span>ווייז</span>
          </a>
          <a href={data.contact.waze} className={styles.button}>
            <FaWaze className={styles.icon} />
            <span>ווייז</span>
          </a>
        </div>

      </div>
      <button onClick={handleDownloadContact} className={styles.addContactButton}>
        <FaPlus className={styles.plusIcon} />
        <span>שמירת איש קשר</span>
      </button>
      <div className={styles.about}>
        <h2>אודותינו</h2>
        <p>{data.about}</p>
      </div>
      <div className={styles.businessHours}>
        <h2>שעות פעילות</h2>
        <p>{data.businessHours}</p>
      </div>
      <div className={styles.sections}>
        {data.sections.map((section: any, index: number) => (
          <div key={index} className={styles.section}>
            <button className={styles.sectionHeader} onClick={() => handleToggleSection(index)}>
              <span>{section.subTitle}</span>
              {openSections[index] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openSections[index] && <div className={styles.sectionContent}>{section.content}</div>}
          </div>
        ))}
      </div>
      <div className={styles.gallery}>
        {data.gallery.map((photo: string, index: number) => (
          <img key={index} className={styles.galleryPhoto} src={photo} alt={`Gallery Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};