"use client"

import type React from "react"
import CardEditor, { BusinessCardData } from "../components/CardEditor";

// Default data
const defaultData: BusinessCardData = {
  name: "שם העסק",
  coverImage: "/defaults/hadshake.jpeg" as string,
  mainPhoto: "/defaults/man.png" as string,
  gallery: ["/defaults/man.png", "/defaults/man.png"] as string[],
  headerText: "תיאור קצר",
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