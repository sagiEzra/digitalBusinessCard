import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { BusinessCard } from "./BusinessCard";
import { addDoc, collection, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaUpload,
  FaTrash,
  FaPlus,
  FaMinus,
  FaPalette,
  FaImage,
  FaUser,
  FaPhone,
  FaSearch,
  FaPen,
} from "react-icons/fa";

// ImageUpload Component
const ImageUpload: React.FC<{
  value: string;
  onChange: (url: string) => void;
  label: string;
  className?: string;
}> = ({ value, onChange, label, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files[0]) {
        const url = URL.createObjectURL(files[0]);
        onChange(url);
      }
    },
    [onChange]
  );
  return (
    <div className={`relative ${className}`}>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${isDragging
          ? "border-blue-400 bg-blue-50"
          : value
            ? "border-green-400 bg-green-50"
            : "border-blue-300 bg-blue-50 hover:border-blue-400"
          }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative">
            <img src={value || "/placeholder.svg"} alt={label} className="w-full h-32 object-cover rounded-lg mb-2" />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ) : (
          <div>
            <FaUpload className="mx-auto text-3xl text-blue-400 mb-2" />
            <p className="text-blue-700 font-medium">{label}</p>
            <p className="text-blue-500 text-sm mt-1">גרור קובץ או לחץ לבחירה</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ColorPicker Component
const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  label: string;
  showGradients?: boolean;
  showWhites?: boolean;
}> = ({ value, onChange, label, showGradients = false, showWhites = false }) => {
  // Popular, user-friendly colors that fit many website themes
  const colors = [
    "#E5E7EB", // Light Gray (neutral, clean)
    "#111827", // Dark Gray (text, contrast)
    "#FFFFFF", // White (universal, clean)
    "#2563EB", // Blue (primary, modern)
    "#0EA5E9", // Sky Blue (fresh, tech)
    "#22C55E", // Green (success, eco, modern)
    "#F43F5E", // Rose (trendy, friendly)
    "#F59E42", // Orange (warm, inviting)
    "#6366F1", // Indigo (professional, modern)
    "#FBBF24", // Yellow (highlight, attention)
  ];
  // Filter out white and near-white colors if showWhites is false
  const filteredColors = showWhites
    ? colors
    : colors.filter(
        (color) =>
          color.toUpperCase() !== "#FFFFFF" &&
          color.toUpperCase() !== "#E5E7EB"
      );
  const gradients = [
    "linear-gradient(135deg, #111827 0%,rgb(145, 145, 145) 100%)", // Dark Gray to Light Gray
    "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)", // Blue to Sky Blue
    "linear-gradient(135deg, #0EA5E9 0%, #22C55E 100%)", // Sky Blue to Green
    "linear-gradient(135deg, #6366F1 0%, #2563EB 100%)", // Indigo to Blue
    "linear-gradient(135deg, #6366F1 0%, #F43F5E 100%)", // Indigo to Rose
    "linear-gradient(135deg, #22C55E 0%, #FBBF24 100%)", // Green to Yellow
    "linear-gradient(135deg, #FBBF24 0%, #F43F5E 100%)", // Yellow to Rose
    "linear-gradient(135deg, #F43F5E 0%, #F59E42 100%)", // Rose to Orange
    "linear-gradient(135deg, #F59E42 0%, #FBBF24 100%)", // Orange to Yellow
  ];
  return (
    <div>
      <label className="block text-blue-900 font-medium mb-2">{label}</label>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-blue-700 mb-2">צבעים מוצקים</h4>
        <div className="flex flex-wrap gap-2">
          {filteredColors.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${value === color ? "border-blue-900 scale-110 shadow-lg" : "border-gray-300 hover:scale-105"}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
      {showGradients && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-blue-700 mb-2">גרדיאנטים</h4>
          <div className="flex flex-wrap gap-2">
            {gradients.map((gradient, index) => (
              <button
                key={index}
                onClick={() => onChange(gradient)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${value === gradient ? "border-blue-900 scale-110 shadow-lg" : "border-gray-300 hover:scale-105"}`}
                style={{ background: gradient }}
                title={`גרדיאנט ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value.startsWith('linear-gradient') ? '#3B82F6' : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
          title="בחר צבע מותאם אישית"
        />
        <span className="text-sm text-blue-600">צבע מותאם אישית</span>
      </div>
    </div>
  );
};

// RouteNameModal Component
const RouteNameModal: React.FC<{
  isOpen: boolean;
  onSubmit: (routeName: string) => void;
  onCancel: () => void;
  error?: string;
  editMode?: boolean;
}> = ({ isOpen, onSubmit, onCancel, error, editMode }) => {
  const [routeName, setRouteName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (routeName.trim()) {
      onSubmit(routeName.trim());
      setRouteName("");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          {editMode ? "ערוך שם נתיב לכרטיס שלך" : "בחר שם נתיב לכרטיס שלך"}
        </h3>
        <p className="text-blue-600 text-sm mb-6 text-center">
          זה יהיה הכתובת הייחודית של הכרטיס שלך באינטרנט
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-900 font-medium mb-2">שם הנתיב</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="לדוגמה: my-business"
              className="w-full p-4 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              autoFocus
            />
            <p className="text-blue-500 text-sm mt-1">רק אותיות, מספרים ומקפים מותרים</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={!routeName.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editMode ? "ערוך" : "המשך"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    floatingWhatsapp?: boolean
    hideFooter?: boolean
    customDomain: boolean
    removeBranding: boolean
  }
}

const PremiumOptionCheckbox: React.FC<{
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  price: number;
  recommended?: boolean;
}> = ({ id, checked, onChange, label, price, recommended }) => (
  <div className="flex items-center gap-3 relative">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-blue-900 font-medium flex items-center gap-2">
      {label} (₪{price})
      {recommended && (
        <span className="ml-2 px-2 py-0.5 bg-blue-200 text-blue-700 rounded-full text-s font-bold">אהוב במיוחד</span>
      )}
    </label>
  </div>
);

const CardEditor: React.FC<{
  initialData: BusinessCardData;
  editMode: boolean;
  routeName?: string;
}> = ({ initialData, editMode, routeName }) => {
  const [data, setData] = useState<BusinessCardData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [routeError, setRouteError] = useState("");
  const [userData, setUserData] = useState<{ user: any; data: BusinessCardData } | null>(null);
  const router = useRouter();

  // TODO: add localstorage saving progress on create page.

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setUserData({ user, data });
      }
    });
    return () => unsubscribe();
  }, [router, data]);

  // If editMode, fetch card data by routeName
  useEffect(() => {
    if (editMode && routeName) {
      (async () => {
        const q = query(collection(db, "businesses"), where("routeName", "==", routeName));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setData(querySnapshot.docs[0].data() as any);
        }
      })();
    }
  }, [editMode, routeName]);

  // Validation
  useEffect(() => {
    const isFormValid = data.name?.trim() !== "" && data.headerText?.trim() !== "";
    setIsValid(isFormValid);
  }, [data]);

  const updateData = (path: string, value: any) => {
    setData((prev: any) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, defaultItem: any) => {
    const current = path.split(".").reduce((obj, key) => obj[key], data) as any[];
    updateData(path, [...current, defaultItem]);
  };

  const removeArrayItem = (path: string, index: number) => {
    const current = path.split(".").reduce((obj, key) => obj[key], data) as any[];
    updateData(
      path,
      current.filter((_: any, i: number) => i !== index),
    );
  };

  // Save logic
  const handleSave = async () => {
    try {
      if (!userData) return;
      const { user } = userData;
      const docId = user.uid;
      if (!docId) return;
      if (editMode) {
        const docRef = doc(db, "businesses", routeName);
        await setDoc(docRef, { ...data, routeName, createdBy: user.uid, updatedAt: new Date() });
        alert("הכרטיס עודכן בהצלחה!");
        router.replace("/manage");
      } else {
        setShowRouteModal(true);
      }
    } catch (err) {
      alert("שגיאה בשמירה");
    }
  };

  const handleRouteNameSubmit = async (routeNameValue: string) => {
    try {
      const routeNameRegex = /^[a-zA-Z0-9-]+$/;
      if (!routeNameRegex.test(routeNameValue)) {
        setRouteError("שם הנתיב חייב להכיל רק אותיות, מספרים ומקפים!");
        return;
      }

      // ensure still logged in
      if (!userData) {
        setRouteError("אירעה שגיאה. אנא נסה שוב.");
        return;
      }
      const { user } = userData;
      const uid = user.uid;
      if (!uid) {
        setRouteError("אירעה שגיאה בזיהוי המשתמש. אנא נסה שוב.");
        return;
      }

      // 👇 Check role from Firestore
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      let isAdminUser = false;

      if (userDocSnap.exists()) {
        isAdminUser = userDocSnap.data().isAdmin;
      }

      // Fetch all cards for this user
      const cardsOfUserQuery = query(
        collection(db, "businesses"),
        where("createdBy", "==", uid)
      );
      const cardsResponse = await getDocs(cardsOfUserQuery);
      const cards = cardsResponse.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const docRef = doc(db, "businesses", routeNameValue);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() && (cards.length === 0 || isAdminUser)) {
        await setDoc(docRef, {
          ...data,
          routeName: routeNameValue,
          createdBy: uid,
          createdAt: new Date(),
        });
        setShowRouteModal(false);
        alert("הכרטיס נוצר בהצלחה! הנתיב שלך: " + routeNameValue);
        router.replace("/manage");
      } else {
        setRouteError("משתמש זה כבר יצר כרטיס. לשדרוג צור קשר.");
        setShowRouteModal(false);
      }
    } catch (err) {
      setRouteError("אירעה שגיאה ביצירת הכרטיס. אנא נסה שוב.");
    }
  };

  const handleRouteModalCancel = () => {
    setShowRouteModal(false);
    setRouteError("");
  };

  // Calculate total price
  const basePrice = 590;
  const premiumPrices = {
    floatingWhatsapp: 32,
    hideFooter: 100,
    customDomain: 120,
    removeBranding: 100,
  };
  const premium = (data.premium ?? {}) as {
    floatingWhatsapp?: boolean;
    hideFooter?: boolean;
    customDomain?: boolean;
    removeBranding?: boolean;
  };
  const totalPrice =
    basePrice +
    (premium?.floatingWhatsapp ? premiumPrices.floatingWhatsapp : 0) +
    (premium?.hideFooter ? premiumPrices.hideFooter : 0) +
    (premium?.customDomain ? premiumPrices.customDomain : 0) +
    (premium?.removeBranding ? premiumPrices.removeBranding : 0);

  // Steps definition (replace 'צור' with 'ערוך' in editMode)
  const steps = [
    {
      title: "פרטים בסיסיים",
      icon: <FaUser />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">בואו נכיר!</h2>
            <p className="text-blue-700 text-lg">ספרו לנו על העסק שלכם</p>
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">שם העסק *</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateData("name", e.target.value)}
              placeholder="לדוגמה: סטודיו עיצוב כהן"
              className="w-full p-4 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">תיאור קצר *</label>
            <textarea
              value={data.headerText}
              onChange={(e) => updateData("headerText", e.target.value)}
              placeholder="לדוגמה: עיצוב פנים יוקרתי ומקצועי"
              className="w-full p-4 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg h-24 resize-none"
            />
            <p className="text-blue-600 text-sm mt-1">💡 תיאור קצר ומושך יעזור ללקוחות להבין מה אתם עושים</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ImageUpload
              value={data.mainPhoto}
              onChange={(url) => updateData("mainPhoto", url)}
              label="תמונה ראשית (לוגו/תמונה אישית)"
            />
            <ImageUpload
              value={data.coverImage}
              onChange={(url) => updateData("coverImage", url)}
              label="תמונת רקע (אופציונלי)"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">גודל תמונה ראשית</label>
              <select
                value={data.design?.mainPhotoSize || "l"}
                onChange={(e) => updateData("design.mainPhotoSize", e.target.value)}
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="m">קטן</option>
                <option value="l">בינוני</option>
                <option value="xl">גדול</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">הצג תמונה ראשית בחלק העליון</label>
              <input
                type="checkbox"
                id="mainPhotoOnTop"
                checked={data.design?.isMainPhotoOnTop || false}
                onChange={(e) => updateData("design.isMainPhotoOnTop", e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
          <ColorPicker
            value={data.design?.mainPhotoBorderColor || "#3B82F6"}
            onChange={(color) => updateData("design.mainPhotoBorderColor", color)}
            label="צבע מסגרת תמונה ראשית"
            showWhites={true}
          />
        </div>
      ),
    },
    {
      title: "כפתורי קשר",
      icon: <FaPhone />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">איך ליצור קשר?</h2>
            <p className="text-blue-700 text-lg">הוסיפו את כל הדרכים שבהן לקוחות יכולים ליצור איתכם קשר</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">טלפון</label>
              <input
                type="tel"
                value={data.contact?.phone || ""}
                onChange={(e) => updateData("contact.phone", e.target.value)}
                placeholder="050-1234567"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">וואטסאפ</label>
              <input
                type="tel"
                value={data.contact?.whatsapp || ""}
                onChange={(e) => updateData("contact.whatsapp", e.target.value)}
                placeholder="050-1234567"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">אימייל</label>
              <input
                type="email"
                value={data.contact?.email || ""}
                onChange={(e) => updateData("contact.email", e.target.value)}
                placeholder="info@business.co.il"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">אתר אינטרנט</label>
              <input
                type="url"
                value={data.contact?.website || ""}
                onChange={(e) => updateData("contact.website", e.target.value)}
                placeholder="https://www.business.co.il"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">פייסבוק</label>
              <input
                type="url"
                value={data.contact?.facebook || ""}
                onChange={(e) => updateData("contact.facebook", e.target.value)}
                placeholder="https://facebook.com/business"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">אינסטגרם</label>
              <input
                type="url"
                value={data.contact?.instagram || ""}
                onChange={(e) => updateData("contact.instagram", e.target.value)}
                placeholder="https://instagram.com/business"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">קטלוג</label>
              <input
                type="url"
                value={data.contact?.catalog || ""}
                onChange={(e) => updateData("contact.catalog", e.target.value)}
                placeholder="https://yourCatalog.com"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">לינקדאין</label>
              <input
                type="url"
                value={data.contact?.linkedin || ""}
                onChange={(e) => updateData("contact.linkedin", e.target.value)}
                placeholder="https://linkedin.com/company/business"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">וייז (דרכי הגעה)</label>
              <input
                type="url"
                value={data.contact?.waze || ""}
                onChange={(e) => updateData("contact.waze", e.target.value)}
                placeholder="קישור למיקום בוויז"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">מיקום (Google Maps)</label>
              <input
                type="url"
                value={data.contact?.maps || ""}
                onChange={(e) => updateData("contact.maps", e.target.value)}
                placeholder="קישור למיקום בגוגל מפות"
                className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">שעות פעילות</label>
            <textarea
              value={data.businessHours}
              onChange={(e) => updateData("businessHours", e.target.value)}
              placeholder="ראשון-חמישי: 9:00-18:00\nשישי: 9:00-14:00\nשבת: סגור"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            />
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <FaPalette className="text-blue-500" />
              עיצוב כפתורי הקשר
            </h3>
            <p className="text-blue-600 text-sm mb-4">התאימו את הצבעים של כפתורי הקשר לכרטיס שלכם</p>
            <div className="grid md:grid-cols-2 gap-6">
              <ColorPicker
                value={data.design?.iconsBackground || "#3B82F6"}
                onChange={(color) => updateData("design.iconsBackground", color)}
                label="צבע רקע כפתורים"
                showGradients={true}
              />
              <ColorPicker
                value={data.design?.iconsHoverBackground || "#1D4ED8"}
                onChange={(color) => updateData("design.iconsHoverBackground", color)}
                label="צבע רקע כפתורים (hover)"
                showGradients={true}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "תוכן העסק",
      icon: <FaPen />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">ספרו על עצמכם</h2>
            <p className="text-blue-700 text-lg">ככל שתכתבו בצורה טובה יותר – הכרטיס שלכם ירשים יותר!</p>
          </div>
          {data.about?.map((item, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-blue-900">סעיף {index + 1}</h3>
                {data.about.length > 1 && (
                  <button
                    onClick={() => removeArrayItem("about", index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-900 font-medium mb-2">כותרת משנה (אופציונלי)</label>
                  <input
                    type="text"
                    value={item.subTitle || ""}
                    onChange={(e) => updateData(`about.${index}.subTitle`, e.target.value)}
                    placeholder="לדוגמה: השירותים שלנו"
                    className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-medium mb-2">תיאור</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateData(`about.${index}.description`, e.target.value)}
                    placeholder="ספרו על העסק, השירותים, הניסיון שלכם..."
                    className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 font-medium mb-2">נקודות מרכזיות (אופציונלי)</label>
                  {(item.dots || []).map((dot, dotIndex) => (
                    <div
                      key={dotIndex}
                      className="flex gap-2 mb-2 items-center group"
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", dotIndex.toString());
                      }}
                      onDragOver={e => {
                        e.preventDefault();
                        e.currentTarget.classList.add("ring-2", "ring-blue-400");
                      }}
                      onDragLeave={e => {
                        e.currentTarget.classList.remove("ring-2", "ring-blue-400");
                      }}
                      onDrop={e => {
                        e.preventDefault();
                        e.currentTarget.classList.remove("ring-2", "ring-blue-400");
                        const fromIndex = Number(e.dataTransfer.getData("text/plain"));
                        const toIndex = dotIndex;
                        if (fromIndex !== toIndex) {
                          const newDots = [...(item.dots || [])];
                          const [moved] = newDots.splice(fromIndex, 1);
                          newDots.splice(toIndex, 0, moved);
                          updateData(`about.${index}.dots`, newDots);
                        }
                      }}
                      style={{ cursor: "grab" }}
                    >
                      <span
                        className="text-blue-400 cursor-grab select-none pr-1"
                        title="גרור לשינוי סדר"
                        aria-label="גרור לשינוי סדר"
                        style={{ fontSize: "1.25rem" }}
                      >
                        &#9776;
                      </span>
                      <input
                        type="text"
                        value={dot}
                        onChange={(e) => {
                          const newDots = [...(item.dots || [])]
                          newDots[dotIndex] = e.target.value
                          updateData(`about.${index}.dots`, newDots)
                        }}
                        placeholder="נקודה מרכזית"
                        className="flex-1 p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newDots = (item.dots || []).filter((_, i) => i !== dotIndex)
                          updateData(`about.${index}.dots`, newDots)
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newDots = [...(item.dots || []), ""]
                      updateData(`about.${index}.dots`, newDots)
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 mt-2"
                  >
                    <FaPlus /> הוסף נקודה
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => addArrayItem("about", { description: "", dots: [] })}
            className="w-full p-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaPlus /> הוסף סעיף נוסף
          </button>
        </div>
      ),
    },
    {
      title: "גלריה",
      icon: <FaImage />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">הוסף תמונות לגלריה</h2>
            <p className="text-blue-700 text-lg">הוסיפו תמונות נוספות לגלריה של הכרטיס</p>
          </div>
          <div>
            {/* Multi-image upload area */}
            <ImageUpload
              value={""}
              onChange={(url) => updateData(`gallery.${data.gallery.length}`, url)}
              label="העלה תמונה לגלריה"
              className="mb-4"
            />
            {/* Thumbnails of uploaded images */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`gallery-img-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg border border-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = data.gallery.filter((_, i) => i !== idx)
                        updateData("gallery", newGallery)
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors z-10"
                      title="הסר תמונה"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">סוג גלריה</label>
            <select
              value={data.design?.imagesDisplay || "carousel"}
              onChange={(e) => updateData("design.imagesDisplay", e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="carousel">קרוסלה</option>
              <option value="mosaic">פסיפס</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "פרימיום",
      icon: <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>+</span>,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">אפשרויות פרימיום</h2>
            <p className="text-blue-700 text-lg">שדרגו את הכרטיס שלכם עם תוספות בתשלום</p>
          </div>
          <div className="space-y-4">
            <PremiumOptionCheckbox
              id="floatingWhatsapp"
              checked={!!data.premium?.floatingWhatsapp}
              onChange={val => updateData('premium.floatingWhatsapp', val)}
              label="כפתור ווצאפ מרחף בפינה"
              price={premiumPrices.floatingWhatsapp}
              recommended={true}
            />
            <PremiumOptionCheckbox
              id="hideFooter"
              checked={!!data.premium?.hideFooter}
              onChange={val => updateData('premium.hideFooter', val)}
              label="הסתר כותרת תחתונה"
              price={premiumPrices.hideFooter}
            />
            <PremiumOptionCheckbox
              id="customDomain"
              checked={!!data.premium?.customDomain}
              onChange={val => updateData('premium.customDomain', val)}
              label="דומיין מותאם אישית"
              price={premiumPrices.customDomain}
            />
            <PremiumOptionCheckbox
              id="removeBranding"
              checked={!!data.premium?.removeBranding}
              onChange={val => updateData('premium.removeBranding', val)}
              label="הסרת מיתוג"
              price={premiumPrices.removeBranding}
            />
          </div>
        </div>
      ),
    },
    {
      title: "SEO ושיתוף",
      icon: <FaSearch />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">אופטימיזציה לחיפוש</h2>
            <p className="text-blue-700 text-lg">עזרו ללקוחות למצוא אתכם בגוגל ובמדיה החברתית</p>
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">כותרת SEO</label>
            <input
              type="text"
              value={data.seo?.title || ""}
              onChange={(e) => updateData("seo.title", e.target.value)}
              placeholder={`${data.name} - ${data.headerText}`}
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">תיאור SEO</label>
            <textarea
              value={data.seo?.description || ""}
              onChange={(e) => updateData("seo.description", e.target.value)}
              placeholder="תיאור קצר שיופיע בתוצאות החיפוש"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-2">מילות מפתח</label>
            <input
              type="text"
              value={data.seo?.keywords || ""}
              onChange={(e) => updateData("seo.keywords", e.target.value)}
              placeholder="עיצוב פנים, אדריכלות, ירושלים"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-blue-600 text-sm mt-1">הפרידו מילות מפתח בפסיקים</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex">
      {/* Preview Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[450px] bg-white border-r border-blue-200 shadow-xl flex flex-col z-40">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="sticky top-0 z-50 bg-white py-4 px-6 border-b border-blue-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow px-4 py-2 border border-green-200 flex items-center gap-2">
              <span className="text-base font-bold text-blue-700">סך הכל לתשלום</span>
              <span className="text-xl font-extrabold text-green-600">₪{totalPrice}</span>
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl shadow-2xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(44, 120, 220, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.08)',
              border: '1.5px solid #dbeafe',
              minHeight: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                transform: 'scale(0.95)',
                transformOrigin: 'top center',
                width: '100%',
                height: '100%',
                boxShadow: '0 4px 24px 0 rgba(44, 120, 220, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.06)',
                borderRadius: '1.25rem',
                background: 'white',
                padding: '0.5rem',
                overflow: 'hidden',
              }}
              className="transition-transform duration-300"
            >
              <div
                className="overflow-auto"
                style={{
                  maxHeight: 'calc(100vh - 180px)',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#60a5fa #e0e7ef',
                }}
              >
                <style jsx global>{`
                  .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #e0e7ef transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e0e7ef;
                    border-radius: 4px;
                  }
                `}</style>
                <div className="custom-scrollbar">
                  <BusinessCard data={data} highlightStep={currentStep} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 z-50 bg-white p-4 border-t border-blue-100">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`relative overflow-visible w-full py-4 px-6 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 focus:outline-none ${isValid
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            style={{ zIndex: 1 }}
          >
            <span className="relative z-10">{editMode ? "ערוך את הכרטיס שלך" : "צור את הכרטיס שלך עכשיו"}</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-[350px] min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto flex flex-col min-h-screen relative">
          <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-900 to-blue-700 rounded-b-2xl shadow-lg mb-8 py-4 px-2">
            <div className="flex justify-between items-center p-2">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col items-center group p-4 transition-all duration-200 ${index === currentStep ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                  style={{ outline: index === currentStep ? '2px solid #3B82F6' : 'none', borderRadius: '20%' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-1 transition-all duration-300 ${index === currentStep ? 'bg-blue-200 text-blue-900 shadow-lg' : 'bg-blue-800 text-blue-300'
                    }`}>
                    {step.icon}
                  </div>
                  <span className="text-xs mt-1 text-center text-white whitespace-nowrap drop-shadow-lg">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 mb-24">
            {steps[currentStep].component}
          </div>
          <div className="sticky bottom-0 z-30 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl shadow-lg py-4 px-2 flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              חזור
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                המשך
              </button>
            ) : null}
          </div>
        </div>
      </main>
      <RouteNameModal
        isOpen={showRouteModal}
        onSubmit={handleRouteNameSubmit}
        onCancel={handleRouteModalCancel}
        error={routeError}
        editMode={editMode}
      />
    </div>
  );
};

export default CardEditor; 