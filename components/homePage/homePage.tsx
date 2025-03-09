import React, { useEffect, useRef, useState } from "react";
import styles from "./homePage.module.css";
import { FaClock, FaAccessibleIcon, FaShare, FaGoogle } from "react-icons/fa";
import { FloatingWhatsAppButton } from "../floationgWhatsAppButton/FloatingWhatsAppButton";

const sagiContact = {
    whatsapp: "https://wa.me/972534244489?text=%D7%94%D7%99%D7%99%20%D7%9E%D7%94%20%D7%94%D7%95%D7%9C%D7%9A%3F%0A%D7%90%D7%A0%D7%99%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A2%D7%95%D7%93%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%91%D7%99%D7%A7%D7%95%D7%A8%20%D7%94%D7%93%D7%99%D7%92%D7%99%D7%98%D7%9C%D7%99"
};

export const HomePage: React.FC = () => {
    const benefitRef = useRef<(HTMLDivElement | null)[]>([]);
    const stepRef = useRef<(HTMLDivElement | null)[]>([]);
    const onCtaClick = () => {
        window.open(
            sagiContact.whatsapp,
            "_blank"
        );
    }

    useEffect(() => {
        benefitRef.current.forEach((el, index) => {
            setTimeout(() => {
                if (el) {
                    el.classList.add(styles.visible);
                }
            }, index * 200);
        });
        stepRef.current.forEach((el, index) => {
            setTimeout(() => {
                if (el) {
                    el.classList.add(styles.visible);
                }
            }, index * 200);
        });
        
    }, []);

    return (
        <div className={styles.container}>
            <FloatingWhatsAppButton contact={sagiContact}/>
            <header className={styles.header}>
                <h1>הכרטיס הדיגיטלי שישדרג את העסק שלך!</h1>
                <p>הדרך המהירה, הקלה והחדשנית להציג את העסק שלך ולמשוך יותר לקוחות</p>
                <button onClick={onCtaClick} className={styles.ctaButton}>צור כרטיס דיגיטלי עכשיו</button>
            </header>

            <section className={styles.benefits}>
                <h2>למה כרטיס דיגיטלי?</h2>
                <div className={styles.benefitList}>
                    {[
                        { icon: <FaClock />, text: "יצירה מהירה תוך כלום זמן" },
                        { icon: <FaAccessibleIcon />, text: "נגיש בכל זמן ומקום" },
                        { icon: <FaShare />, text: "שיתוף קל עם לקוחות" },
                        { icon: <FaGoogle />, text: "מופיע בגוגל ומקדם את העסק" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={styles.benefitItem}
                            ref={(el) => { (benefitRef.current[index] = el) }}
                        >
                            {item.icon}
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.steps}>
                <h2>איך זה עובד?</h2>
                <div className={styles.stepList}>
                    {["בחר עיצוב והתאם אישית", "הזן פרטי העסק שלך", "שתף והתחל לקבל לקוחות"].map((text, index) => (
                        <div
                            key={index}
                            className={styles.stepItem}
                            ref={(el) => { (stepRef.current[index] = el) }}
                        >
                            <span>{index + 1}</span>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className={styles.footer}>
                <p>הצטרף עכשיו למאות עסקים שכבר נהנים מכרטיס דיגיטלי מתקדם</p>
                <button onClick={onCtaClick} className={styles.ctaButton}>
                    בוא נתחיל
                </button>
            </footer>
        </div>
    );
};
