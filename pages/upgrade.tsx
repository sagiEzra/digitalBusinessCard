import React, { useState, useRef } from "react";
import PricingCard from "../components/PricingCard";
import PaymentSection from "../components/PaymentSection";

const upgradeOptions = [
  {
    key: "personal",
    title: "כרטיס דיגיטלי אישי",
    price: "₪690",
    features: [
      "עיצוב אישי ומותאם",
      "שיתוף מהיר בכל פלטפורמה",
      "עדכון פרטים ללא הגבלה",
      "תמיכה טכנית מלאה",
      "ללא מנוי חודשי",
    ],
    buttonText: "שדרג לכרטיס אישי",
  },
  {
    key: "team",
    title: "כרטיס לעסקים/צוותים",
    price: "₪1249",
    subtitle: "מבצע ! 3 כרטיסים",
    features: [
      "כל מה שבחבילה האישית",
      "ניהול מרוכז לכל הצוות",
      "הנחה משמעותית לכמות",
      "תמיכה טכנית מורחבת",
    ],
    buttonText: "שדרג לכרטיס צוות",
  },
];

const stepLabels = ["בחר חבילה", "לתשלום", "סיום"];

const UpgradePage = () => {
  const [selected, setSelected] = useState<null | typeof upgradeOptions[0]>(upgradeOptions[0]);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const paymentRef = useRef<HTMLDivElement>(null);
  const [paidOption, setPaidOption] = useState<null | typeof upgradeOptions[0]>(null);

  const handleSelect = (option: typeof upgradeOptions[0]) => {
    setSelected(option);
    setStep(1);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handlePaymentSuccess = () => {
    setPaidOption(selected);
    setStep(2);
    setShowModal(true);
  };

  const handleWhatsApp = () => {
    if (!paidOption) return;
    const msg = `שלום, ברצוני לשלם עבור החבילה: ${paidOption.title} בעלות ${paidOption.price} ולקבל הרשאות ליצירת כרטיסים דיגיטליים.`;
    const url = `https://wa.me/972534244489?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-10 drop-shadow">שדרג את הכרטיס שלך</h1>
        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          {stepLabels.map((label, idx) => (
            <div key={label} className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg border-2 ${step === idx ? "bg-blue-500 text-white border-blue-500" : step > idx ? "bg-green-400 text-white border-green-400" : "bg-white text-blue-900 border-blue-300"}`}>{idx + 1}</div>
              <span className={`mx-2 text-lg ${step === idx ? "text-blue-900 font-bold" : "text-blue-600"}`}>{label}</span>
              {idx < stepLabels.length - 1 && <div className="w-8 h-1 bg-blue-200 rounded-full mx-2" />}
            </div>
          ))}
        </div>
        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {upgradeOptions.map((option, idx) => (
            <div
              key={option.key}
              className={`transition-all duration-300 ${selected?.key === option.key ? "ring-4 ring-blue-400 scale-105" : "hover:ring-2 hover:ring-blue-200"}`}
              style={{ borderRadius: 24 }}
            >
              <PricingCard
                title={option.title}
                price={option.price}
                subtitle={option.subtitle}
                features={option.features}
                buttonText={option.buttonText}
                onButtonClick={() => handleSelect(option)}
                animationDelay={idx === 1 ? "0.2s" : undefined}
              />
            </div>
          ))}
        </div>
        {/* Payment Section */}
        <div ref={paymentRef} />
        {selected && step === 1 && (
          <PaymentSection
            title={selected.title}
            price={selected.price}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
        {/* Modal Popup */}
        {showModal && paidOption && (
          <div
            dir="rtl"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300"
            aria-modal="true"
            role="dialog"
          >
            <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center animate-fadeIn border-2 border-blue-200">
              {/* Close Button (top right) */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 left-4 text-blue-400 hover:text-blue-700 text-2xl font-bold focus:outline-none transition-colors"
                aria-label="סגור חלון"
              >
                ×
              </button>
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 border-4 border-green-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg animate-bounce">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#4ade80" />
                    <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-blue-900 mb-2 drop-shadow">החבילה נבחרה בהצלחה!</h2>
              <p className="text-lg text-blue-800 mb-1">
                <span className="font-bold">בחרת בחבילה:</span> <span className="text-blue-900 font-bold">{paidOption.title}</span>
              </p>
              <p className="text-lg text-blue-800 mb-4">
                <span className="font-bold">בעלות:</span> <span className="text-blue-900 font-bold">{paidOption.price}</span>
              </p>
              <div className="bg-blue-100 border border-blue-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-2 justify-center text-blue-700 text-base shadow-sm">
                <svg className="inline-block mr-1" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="12" fill="#25D366"/>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51-.173-.007-.372-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.367.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff"/>
                </svg>
                לתשלום מהיר ב WhatsApp וקבלת הרשאות ליצירת כרטיסים בעצמך - לחץ מטה
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-xl transition-all duration-300 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                autoFocus
              >
                המשך
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-1 text-blue-700 hover:text-blue-900 font-medium underline text-base transition-colors"
              >
                סגור חלון
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradePage; 