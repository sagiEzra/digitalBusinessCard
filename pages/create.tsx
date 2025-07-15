"use client"

import type React from "react"
import CardEditor from "../components/CardEditor";

// TODO: there's no need in 2 types, there's one in businessCard as well.
interface BusinessCardData {
  name: string
  coverImage: string
  mainPhoto: string
  gallery: string[]
  headerText: string
  about: { subTitle?: string; description: string; dots?: string[]; dotsIcon?: "dot" | "dash" | "circle" | "vIcon" }[]
  businessHours: string
  contact: {
    phone?: string
    whatsapp?: string
    email?: string
    facebook?: string
    instagram?: string
    website?: string
    linkedin?: string
    maps?: string
    waze?: string
    catalog?: string
  }
  testimonials?: {
    googleReviewsUrl?: string
  }
  sections: { subTitle: string; content: string }[]
  design?: {
    imagesDisplay?: "carousel" | "mosaic"
    mainPhotoSize?: "m" | "l" | "xl"
    mainPhotoBorderColor?: string
    isMainPhotoOnTop?: boolean
    font?: "1"
    iconStyle?: "1"
    iconsBackground?: string
    iconsHoverBackground?: string
    hideFooter?: boolean
  }
  favicon?: {
    faviconIco: string
    favicon32: string
    appleFavicon: string
    siteManifest: string
  }
  cta?: {
    text?: string
    buttonText?: string
  }
  seo?: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    ogUrl: string
    ogSiteName: string
  }
  premium?: {
    customDomain: boolean
    removeBranding: boolean
  }
}

// Default data
const defaultData: BusinessCardData = {
  name: "",
  coverImage: "/defaults/hadshake.jpeg",
  mainPhoto: "/defaults/man.png",
  gallery: [],
  headerText: "",
  about: [
    { subTitle: "עלינו", description: "אנחנו עסק משפחתי עם ניסיון של 20 שנה בתחום.", dots: ["שירות אישי", "מקצועיות", "מחירים נוחים"] },
    { subTitle: "השירותים שלנו", description: "אנו מציעים מגוון שירותים ללקוחות פרטיים ועסקיים.", dots: ["ייעוץ חינם", "זמינות גבוהה", "התאמה אישית"] },
    { subTitle: "למה לבחור בנו?", description: "לקוחותינו נהנים מיחס אישי ומקצועי.", dots: ["המלצות רבות", "שירות מהיר", "אחריות מלאה"] },
  ],
  businessHours: "",
  contact: {
    phone: '0534567890',
    whatsapp: '0534567890',
    email: '0534567890',
    facebook: '0534567890',
    instagram: '0534567890',
    linkedin: '0534567890'
  },
  sections: [],
  design: {
    imagesDisplay: "carousel",
    mainPhotoSize: "l",
    mainPhotoBorderColor: "#3B82F6",
    isMainPhotoOnTop: true,
    font: "1",
    iconStyle: "1",
    iconsBackground: "#3B82F6",
    iconsHoverBackground: "#1D4ED8",
    hideFooter: false,
  },
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogSiteName: "",
  },
  premium: {
    customDomain: false,
    removeBranding: false,
  }
}

// Main Create Card Component
export default function CreateCard() {
  return (
    <CardEditor
      initialData={defaultData}
      editMode={false}
    />
  );
}