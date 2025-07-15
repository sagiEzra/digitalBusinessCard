"use client"

import { FloatingWhatsAppButton } from "../floationgWhatsAppButton/FloatingWhatsAppButton"
import { FaRocket, FaGem, FaShareAlt, FaStar, FaBolt, FaSyncAlt, FaMoneyBillWave, FaPen } from 'react-icons/fa';
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PricingCard from "../PricingCard";
import { theme } from '../../styles/theme';


const cardUrls = [
  "https://ezracards.co.il/bluemedia",
  "https://ezracards.co.il/shirazkahloun",
  "https://ezracards.co.il/madkor"
];

export const Homepage: React.FC = () => {
  const handleCTA = () => {
    // Check auth state and route accordingly
    if (typeof window !== "undefined") {
      const user = auth.currentUser;
      if (user) {
        window.location.href = "/manage";
      } else {
        // Listen for auth state in case of async
        onAuthStateChanged(auth, (u) => {
          if (u) {
            window.location.href = "/manage";
          } else {
            window.location.href = "/login";
          }
        });
      }
    }
  };

  return (
    <div dir="rtl" className="min-h-screen font-sans bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-blue-900">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 opacity-90"></div>
        <div className="relative container mx-auto px-6 py-20 lg:py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg animate-fadeIn">
            כרטיס הביקור הדיגיטלי
            <span className="block bg-gradient-to-r from-blue-200 to-blue-400 text-transparent bg-clip-text animate-gradient">
              שמשנה את המשחק
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto font-medium animate-fadeIn delay-200">
            בנה לעצמך כרטיס ביקור דיגיטלי יוקרתי, מותאם אישית, שמרשים וממיר לקוחות – בקלות, במהירות וללא מנוי חודשי.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fadeIn delay-300">
            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-blue-900 font-bold text-xl px-10 py-5 rounded-full shadow-xl hover:scale-105 transition-all duration-300 min-w-[260px] animate-bounce"
              id="create"
            >
              צור את הכרטיס שלך עכשיו
            </button>
            <a href="#carousel" className="border-2 border-white/60 hover:border-blue-200 text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 min-w-[200px] shadow-lg hover:bg-white/10">
              ראה דוגמאות
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-blue-200 text-lg font-semibold animate-fadeIn delay-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              ללא מנוי חודשי
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              מוכן תוך דקות
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              התאמה אישית מלאה
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="carousel" className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="container mx-auto px-2 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-blue-900 drop-shadow-lg">
            מגוון לקוחות מרוצים
          </h2>

          <div className="overflow-hidden w-full relative">
            <div
              className="flex animate-carousel gap-4 sm:gap-6 md:gap-8"
              style={{
                animation: `carousel ${cardUrls.length * 15}s linear infinite`,
              }}
            >
              {[...Array(5)].flatMap((_, i) =>
                cardUrls.map((url, idx) => (
                  <a
                    key={`${i}-${idx}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={0}
                    aria-label="צפה בכרטיס"
                    className="flex-shrink-0 w-[clamp(14rem,28vw,22rem)] aspect-[10/19.5] sm:aspect-[9/19.5] bg-white rounded-[2.5rem] shadow-xl border-4 border-blue-200 overflow-hidden relative hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    {/* Speaker */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 sm:w-12 md:w-16 h-1.5 bg-blue-200 rounded-full z-10"></div>

                    {/* Iframe content - scaled and centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden flex items-center justify-center">
                        <iframe
                          src={url}
                          title={`business-card-${idx}`}
                          className="w-[450px] h-[880px] max-w-none max-h-none scale-[0.7] sm:scale-[0.75] md:scale-[0.8] origin-center pointer-events-none border-0"
                          scrolling="no"
                          allow="clipboard-write"
                          tabIndex={-1}
                        />
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          <style>{`
      @keyframes carousel {
        0% { transform: translateX(0); }
        100% { transform: translateX(100%); }
      }

      .animate-carousel {
        width: max-content;
        min-width: 100%;
        will-change: transform;
      }

      @media (max-width: 640px) {
        .animate-carousel {
          gap: 0.5rem;
        }
      }
    `}</style>
        </div>
      </section>


      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 drop-shadow">למה לבחור בכרטיס ביקור דיגיטלי?</h2>
            <p className="text-2xl text-blue-700 max-w-2xl mx-auto font-medium">
              כל היתרונות במקום אחד – חדשנות, נוחות, עיצוב, ומחיר משתלם.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[{
              title: "עיצוב יוקרתי ומותאם אישית",
              description: "בחר צבעים, לוגו, תמונות ופרטים – הכרטיס שלך ייחודי בדיוק כמוך.",
              icon: <FaGem className="text-blue-400 text-5xl mb-4" />,
            },
            {
              title: "שיתוף מיידי וחכם",
              description: "שלח את הכרטיס שלך ללקוחות בוואטסאפ – הלקוח מתרשם ושומר פרטי קשר בלחיצה אחת.",
              icon: <FaShareAlt className="text-blue-400 text-5xl mb-4" />,
            },
            {
              title: "הערך של העסק שלך תמיד בולט",
              description: "הכרטיס הדיגיטלי שלך מציג את כל היתרונות והשירותים שלך – בצורה מקצועית ומרשימה.",
              icon: <FaStar className="text-yellow-400 text-5xl mb-4" />,
            },
            {
              title: "מוכן במהירות",
              description: "המערכת פשוטה ומהירה – כרטיס דיגיטלי מוכן לשיתוף.",
              icon: <FaBolt className="text-blue-400 text-5xl mb-4" />,
            },
            {
              title: "תמיד זמין",
              description: "הכרטיס לא הולך לאיבוד – תמיד אצל הלקוח, תמיד עדכני.",
              icon: <FaSyncAlt className="text-blue-400 text-5xl mb-4" />,
            },
            {
              title: "חיסכון בעלויות",
              description: "תשלום חד פעמי בלבד - ובמחיר שובר שוק",
              icon: <FaMoneyBillWave className="text-green-400 text-5xl mb-4" />,
            }
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200 flex flex-col items-center text-center animate-fadeIn"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              {benefit.icon}
              <h3 className="text-2xl font-bold mb-3 text-blue-900">{benefit.title}</h3>
              <p className="text-blue-700 text-lg">{benefit.description}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-200 via-white to-blue-100 text-blue-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">איך זה עובד?</h2>
            <p className="text-2xl text-blue-700 max-w-2xl mx-auto font-medium">
              3 שלבים פשוטים – ותוך דקות יש לך כרטיס דיגיטלי מקצועי ומרשים.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-10">
            {[
              {
                step: "1",
                title: "בחר תבנית מעוצבת",
                description: "בחר מתוך מגוון תבניות מקצועיות ומעוצבות שמתאימות בדיוק לעסק שלך.",
              },
              {
                step: "2",
                title: "הזן את הפרטים שלך",
                description: "הוסף פרטי עסק, תמונה, לוגו והתאם צבעים ועיצוב.",
              },
              {
                step: "3",
                title: "שתף והתחל להרשים",
                description: "הכרטיס מוכן! שתף אותו עם לקוחות ותתחיל לקבל פניות.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col lg:flex-row items-center gap-8 bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-blue-200 shadow-xl animate-fadeIn"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-3xl shadow-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-right">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-blue-700 text-lg mb-3 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-blue-900 font-bold text-2xl px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              בוא נתחיל - צור כרטיס דיגיטלי משלך
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-200 text-blue-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 drop-shadow">מה אומרים עלינו?</h2>
            <p className="text-2xl text-blue-700">אלפי עסקים כבר בחרו בנו ומרוצים מהתוצאות</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
            {[
              {
                name: "דני כהן",
                business: "סוכן ביטוח",
                text: "הכרטיס הדיגיטלי שינה לי את הדרך שבה אני פוגש לקוחות חדשים. מקצועי, מרשים ונוח!",
              },
              {
                name: "שרה לוי",
                business: "מעצבת פנים",
                text: "לקוחות מתרשמים מהכרטיס הדיגיטלי ושומרים אותי מיד בטלפון. זה עזר לי להגדיל את העסק!",
              },
              {
                name: "מיכאל רוזן",
                business: "יועץ עסקי",
                text: "פשוט, מהיר ויעיל. תוך 5 דקות היה לי כרטיס ביקור מקצועי שמייצג אותי בצורה מושלמת.",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl border border-blue-200 animate-fadeIn" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-2xl shadow">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="mr-4">
                    <h4 className="font-bold text-blue-900">{testimonial.name}</h4>
                    <p className="text-blue-700 text-base">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-blue-900 text-lg leading-relaxed">"{testimonial.text}"</p>
                <div className="flex text-blue-400 mt-4 text-xl">{"★".repeat(5)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-200 via-white to-blue-100 text-blue-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 drop-shadow">מחירון</h2>
            <p className="text-2xl text-blue-700 max-w-2xl mx-auto font-medium">
              תשלום חד פעמי בלבד – ללא הפתעות, ללא מנוי חודשי.
            </p>
            <p className="text-blue-800 text-lg mt-4 bg-blue-100 rounded-xl px-2 py-1 shadow-sm border border-blue-200 flex items-center justify-center gap-2 w-fit mx-auto">
              * אבטחה ואחסון לאתר 
              <span className="inline-flex items-center gap-1 align-middle">
                מהיר כמו <FaRocket className="text-blue-500 text-xl" />
              </span>
              במחיר עלות - 190₪ לשנה.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <PricingCard
              title="כרטיס לעסקים/צוותים"
              price="₪990"
              subtitle="מבצע ! 3 כרטיסים"
              features={[
                "כל מה שבחבילה האישית",
                "ניהול מרוכז לכל הצוות",
                "הנחה משמעותית לכמות",
                "תמיכה טכנית מורחבת",
              ]}
              buttonText="קבל הצעת מחיר"
              onButtonClick={handleCTA}
              animationDelay="0.2s"
            />
            <PricingCard
              title="כרטיס דיגיטלי אישי"
              price="₪390"
              features={[
                "עיצוב אישי ומותאם",
                "שיתוף מהיר בכל פלטפורמה",
                "עדכון פרטים ללא הגבלה",
                "תמיכה טכנית מלאה",
                "ללא מנוי חודשי",
              ]}
              buttonText="התחל עכשיו"
              onButtonClick={handleCTA}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">שאלות נפוצות</h2>
            <p className="text-2xl text-blue-100">כל מה שרצית לדעת על כרטיסי ביקור דיגיטליים</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                question: "כמה זמן לוקח ליצור כרטיס ביקור דיגיטלי?",
                answer: "תוך 5-10 דקות תוכל ליצור כרטיס מקצועי ומרשים. הממשק פשוט ולא דורש ידע טכני.",
              },
              {
                question: "האם אני יכול לעדכן את הכרטיס שלי אחרי שיצרתי אותו?",
                answer: "כמובן! תוכל לעדכן את הכרטיס שלך בכל עת - לשנות פרטים, להוסיף תמונות ולעדכן עיצוב.",
              },
              {
                question: "איך הלקוחות שלי ישמרו את הכרטיס שלי?",
                answer: "הלקוחות שומרים את הכרטיס ישירות לאנשי הקשר בלחיצה אחת, או ניגשים אליו דרך קישור.",
              },
              {
                question: "האם יש מנוי חודשי?",
                answer: "לא! תשלום חד פעמי בלבד. הכרטיס שלך יישאר פעיל לתמיד.",
              },
              {
                question: "מה אם אני לא מרוצה מהתוצאה?",
                answer: "יש לך 14 יום להחזר כספי מלא, ללא שאלות.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-blue-800/80 p-8 rounded-2xl shadow-xl border border-blue-200 animate-fadeIn" style={{ animationDelay: `${0.1 * idx}s` }}>
                <h3 className="text-2xl font-bold mb-3 text-blue-100">{faq.question}</h3>
                <p className="text-blue-50 text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכן להרשים את הלקוחות שלך?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            הצטרף לאלפי עסקים שכבר בחרו בכרטיס ביקור דיגיטלי ומתחילים להרשים לקוחות חדשים כל יום
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-blue-900 font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 min-w-[300px]"
            >
              צור את הכרטיס שלך עכשיו
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <span>✓ ללא סיכון - החזר כספי תוך 14 יום</span>
            <span>✓ תמיכה טכנית מלאה</span>
            <span>✓ מוכן תוך דקות</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">כרטיס ביקור דיגיטלי</h3>
              <p className="text-blue-200 text-lg">
                הפלטפורמה המובילה ליצירת כרטיסי ביקור דיגיטליים מקצועיים ומרשימים
              </p>
            </div>
            <nav>
              <ul className="flex flex-wrap gap-8 text-lg font-semibold">
                <li>
                  <a href="create" className="hover:text-blue-200 transition-colors">צור כרטיס</a>
                </li>
                <li>
                  <a href="#carousel" className="hover:text-blue-200 transition-colors">דוגמאות</a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-blue-200 transition-colors">למה דיגיטלי?</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-blue-200 transition-colors">שאלות נפוצות</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
            <p className="mb-2">כל הזכויות שמורות © {new Date().getFullYear()}</p>
            <p>נבנה באהבה כדי לקדם עסקים בישראל 🇮🇱</p>
          </div>
        </div>
      </footer>
      <FloatingWhatsAppButton contact={{ whatsapp: '052' }} />
    </div>
  )
}