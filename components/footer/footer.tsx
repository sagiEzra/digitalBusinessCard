import React from 'react';
import styles from './footer.module.css';

export const Footer = () => {
    const handleClick = () => {
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL || '/';
    };
    return (
        <div className={styles.footer}>
            <p className={styles.text}>כרטיס ביקור דיגיטלי מבית EZRA-TECH</p>
            <p className={styles.text}>שיתוף פרטי העסק שלך – קל, מהיר, מעוצב ויוקרתי</p>
            <p className={styles.text}>מושך לקוחות, פשוט, פרקטי, מחיר מנצח</p>
            <a href={process.env.NEXT_PUBLIC_BASE_URL} className={styles.button} onClick={handleClick}>
                יצירת כרטיס ביקור
            </a>
        </div>
    );
};