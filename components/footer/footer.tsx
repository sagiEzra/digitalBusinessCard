import React from 'react';
import styles from './footer.module.css';

export const Footer = () => {
    const handleClick = () => {
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL || '/';
    };
    return (
        <div className={styles.footer}>
            <p className={styles.text}>כרטיס ביקור דיגיטלי מבית EZRA-solutions</p>
            <p className={styles.text}>לשתף את פרטי העסק שלך מעולם לא היה קל יותר</p>
            <p className={styles.text}>פשטות, מהירות, מחיר מנצח</p>
            <a href={process.env.NEXT_PUBLIC_BASE_URL} className={styles.button} onClick={handleClick}>
                יצירת כרטיס ביקור
            </a>
        </div>
    );
};