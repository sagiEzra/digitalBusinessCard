import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CoverMainImage } from './coverMainImages/coverMainImages';
import { MapEmbed } from './mapEmbed/mapEmbed';
import { ContactButtons } from './contactButtons/contactButtons';
import { Sections } from './sections/sections';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { FloatingWhatsAppButton } from './floationgWhatsAppButton/FloatingWhatsAppButton';
import { Footer } from './footer/footer';

interface Props {
  data: {
    name: string;
    coverImage: string;
    mainPhoto: string;
    gallery: string[];
    headerText: string;
    about: { subTitle?: string; description: string, dots?: string[], dotsIcon?: 'dot' | 'dash' | 'circle' | 'vIcon' }[];
    businessHours: string;
    contact: {
      phone?: string;
      whatsapp?: string;
      email?: string;
      facebook?: string;
      instagram?: string;
      website?: string;
      linkedin?: string;
      maps?: string;
      waze?: string;
    };
    testimonials?: {
      googleReviewsUrl?: string;
    };
    sections: { subTitle: string; content: string }[];
    design?: {
      imagesDisplay?: "carousel" | "mosaic",
      mainPhotoSize?: "m" | "l" | "xl",
      mainPhotoBorderColor?: string,
      isMainPhotoOnTop?: boolean,
      font?: "1",
      iconStyle?: "1",
      iconsBackground?: string;
      iconsHoverBackground?: string;
      hideFooter?: boolean;
    };
    favicon?: {
      faviconIco: string;
      favicon32: string;
      appleFavicon: string;
      siteManifest: string;
    };
    cta?: {
      text?: string;
      buttonText?: string;
    },
    seo?: {
      title: string;
      description: string;
      keywords: string;

      ogTitle: string;
      ogDescription: string;
      ogImage: string;
      ogUrl: string;
      ogSiteName: string;
    };
    premium?: {
      floatingWhatsapp?: boolean
      hideFooter?: boolean
      customDomain: boolean
      removeBranding: boolean
    }
  };
  highlightStep?: number;
}

export const BusinessCard: React.FC<Props> = ({ data, highlightStep }) => {
  const router = useRouter();
  const currentUrl = data.seo?.ogUrl ?? `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  return (
    <React.Fragment>
      <div
        className={`
          min-w-[360px] max-w-[800px] mx-auto p-5 md:p-5 bg-[#f4f7ff]
          rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]
          animate-fadeIn rtl
        `}
        style={{ direction: 'rtl' }}
      >
        <Head>
          <script src="https://cdn.userway.org/widget.js" data-account="TwjEIA8m2a"></script>
          {/* SEO */}
          <title>{data.seo?.title ?? data.name}</title>
          <meta name="description" content={data.seo?.description ?? data.headerText} />
          <meta name="keywords" content={data.seo?.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={currentUrl}></link>
          {/* Social Share */}
          <meta property="og:title" content={data.seo?.ogTitle ?? data.name} />
          <meta property="og:description" content={data.seo?.ogDescription ?? data.headerText} />
          <meta property="og:image" content={data.seo?.ogImage ?? data.mainPhoto} />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:site_name" content={data.seo?.ogSiteName ?? data.name} />
          <meta property="og:type" content="website" />
          {/* favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href={data.favicon?.favicon32} />
          <link rel="shortcut icon" href={data.favicon?.faviconIco} />
          <link rel="apple-touch-icon" sizes="180x180" href={data.favicon?.appleFavicon} />
          {/* <link rel="manifest" href={data.favicon.siteManifest} /> */}
        </Head>

        {/* Header */}
        <div className="text-center">
          <CoverMainImage
            coverImage={data.coverImage}
            mainPhoto={data.mainPhoto}
            mainPhotoSize={data.design?.mainPhotoSize}
            mainPhotoBorderColor={data.design?.mainPhotoBorderColor}
            showDecorativeLines={true}
            isMainPhotoOnTop={data.design?.isMainPhotoOnTop}
          />
          <h1 className="text-[1.7em] font-bold my-[10px] md:text-[2.2em]">{data.name}</h1>
          <p className="relative text-[1.2em] text-[#333] my-4 text-center md:text-[1.2em] md:font-medium">
            {data.headerText}
          </p>
        </div>

        {data.contact &&
          <ContactButtons
            name={data.name}
            contact={data.contact}
            color={data.design?.iconsBackground}
            hoverColor={data.design?.iconsHoverBackground}
            highlight={highlightStep === 1}
          />
        }

        {data.about &&
          <About
            contact={data.contact}
            content={data.about}
            title="קצת עלינו"
            highlight={highlightStep === 2}
            ctaText={data.cta?.buttonText ?? "חייג ואנחנו לרשותך"}
            color={data.design?.iconsBackground}
            hoverColor={data.design?.iconsHoverBackground}
          />
        }

        {data.sections &&
          <Sections sections={data.sections} highlight={highlightStep === 3} />
        }

        <div className="my-6 px-4 py-5 bg-white rounded-[12px] shadow-[0_0_8px_rgba(0,0,0,0.13)] text-center">
          <h2 className="text-[1.5em] mb-3 font-extrabold text-[#222]">שעות פעילות</h2>
          <p className="text-[1.1em] text-[#444]">{data.businessHours}</p>
        </div>

        {data.gallery &&
          <Gallery images={data.gallery} galleryType={data.design?.imagesDisplay} highlight={highlightStep === 4} />
        }

        {/* // TODO: add testimonials. */}

        {data.contact?.maps &&
          <MapEmbed mapsLink={data.contact?.maps} />
        }

        {data.contact?.whatsapp && data.premium.floatingWhatsapp &&
          <FloatingWhatsAppButton contact={data.contact} />
        }
      </div>
      {!data.design?.hideFooter && <Footer />}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        .rtl {
          direction: rtl;
        }
      `}</style>
    </React.Fragment>
  );
};