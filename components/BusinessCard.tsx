import React from 'react';
import Head from 'next/head';
import styles from './BusinessCard.module.css';
import { useRouter } from 'next/router';
import { CoverMainImage } from './coverMainImages/coverMainImages';
import { MapEmbed } from './mapEmbed/mapEmbed';
import { ContactButtons } from './contactButtons/contactButtons';
import { Sections } from './sections/sections';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { FloatingWhatsAppButton } from './floationgWhatsAppButton/FloatingWhatsAppButton';

interface Props {
  data: {
    name: string;
    coverImage: string;
    mainPhoto: string;
    gallery: string[];
    headerText: string;
    about: { subTitle?: string; description: string }[];
    businessHours: string;
    contact: any;
    testimonials: any;
    sections: { subTitle: string; content: string }[];
    design: any;
    favicon: string;
  };
}

export const BusinessCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  return (
    <div className={styles.card}>
      <Head>
        <title>{data.name}</title>

        {/* og tags */}
        <meta name="description" content={data.headerText} />
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.headerText} />
        <meta property="og:image" content={data.mainPhoto} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content={data.name} />
        <meta property="og:type" content="website" />

        {/* favicon */}
        <link rel="icon" href={data.favicon} />
        <link rel="shortcut icon" href={data.favicon} />
        <link rel="apple-touch-icon" href={data.favicon} />
      </Head>
      <div className={styles.header}>
        <CoverMainImage
          coverImage={data.coverImage}
          mainPhoto={data.mainPhoto}
          mainPhotoSize={data.design.mainPhotoSize}
          mainPhotoBorderColor={data.design.mainColor} //TODO: save mainColor as css variable
          showDecorativeLines={true}
        />
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.headerText}>{data.headerText}</p>
      </div>

      <ContactButtons name={data.name} contact={data.contact} mainColor={data.design.mainColor} />

      <About
        contact={data.contact}
        content={data.about}
        title="קצת עלינו" // TODO: make a prop instead of hardcoding
        highlight="כאן כדי לפתור לך כל בעיה" // TODO: make a prop instead of hardcoding
        ctaText="חייג ואנחנו לרשותך" // TODO: make a prop instead of hardcoding
        // onCtaClick={() => alert('Contact us clicked!')}
      />

      <Sections sections={data.sections} />
      <div className={styles.businessHours}>
        <h2>שעות פעילות</h2>
        <p>{data.businessHours}</p>
      </div>
      <Gallery images={data.gallery} galleryType='carousel' />
      {/* // TODO: add testimonials. */}
      <MapEmbed mapsLink={data.contact.maps} />
      <FloatingWhatsAppButton contact={data.contact} /> {/* // TODO: make optional boolean. */}
    </div>
  );
};