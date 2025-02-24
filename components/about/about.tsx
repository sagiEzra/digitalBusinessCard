import React from 'react';
import styles from './about.module.css';

interface AboutProps {
  title: string;
  content: { subTitle?: string; description: string }[];
  highlight?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ title, content, highlight, ctaText, onCtaClick }) => {
  return (
    <div className={styles.about}>
      <h2>{title}</h2>
      {content.map((item, index) => (
        <div key={index} className={styles.contentItem}>
          {item.subTitle && <h3 className={styles.subTitle}>{item.subTitle}</h3>}
          <p>{renderAboutText(item.description)}</p>
        </div>
      ))}
      {highlight && <span className={styles.highlight}>{highlight}</span>}
      {ctaText && (
        <button className={styles.cta} onClick={onCtaClick}>
          {ctaText}
        </button>
      )}
    </div>
  );
};

const renderAboutText = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};