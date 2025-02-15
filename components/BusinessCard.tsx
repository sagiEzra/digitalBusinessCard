import React, { useState } from 'react';
import Head from 'next/head';
import styles from './BusinessCard.module.css';
import { FaGlobe, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaWaze, FaWhatsapp, FaPhone, FaPlus, FaChevronDown, FaChevronUp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Carousel from './carousel/Carousel';
import CoverMainImages from './coverMainImages/coverMainImages';
import { MapEmbed } from './mapEmbed/mapEmbed';
import { ContactButtons } from './contactButtons/contactButtons';

interface Props {
  data: {
    name: string;
    coverImage: string;
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

  const renderAboutText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
        <CoverMainImages
          coverImage={data.coverImage}
          mainPhoto={data.mainPhoto}
          mainPhotoBorderColor={data.design.mainColor} //TODO: save mainColor as css variable
          showDecorativeLines={true}
        />
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.headerText}>{data.headerText}</p>
      </div>

      <ContactButtons name={data.name} contact={data.contact} mainColor={data.design.mainColor}/>

      <div className={styles.about}>
        <h2>בואו נכיר</h2>
        <p>{renderAboutText(data.about)}</p>
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
        <Carousel images={data.gallery} />
      </div>
      <MapEmbed mapsLink={data.contact.maps} />
    </div>
  );
};