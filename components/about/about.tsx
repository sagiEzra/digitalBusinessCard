import React, { useRef, useEffect, useState } from 'react';
import styles from './about.module.css';

interface AboutProps {
  contact: any;
  title: string;
  content: { subTitle?: string; description: string; dots?: string[] }[];
  highlight?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  bulletStyle?: 'dot' | 'dash' | 'circle' | 'vIcon';
}

const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (entries[0].isIntersecting) {
    setVisible(true);
    observer.disconnect();
  }
};

export const About: React.FC<AboutProps> = ({ contact, title, content, highlight, ctaText, onCtaClick, bulletStyle = 'vIcon' }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => handleIntersection(entries, observer, setTitleVisible), { threshold: 0.1 });
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.about}>
      <h2 ref={titleRef} className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>{title}</h2>
      {content.map((item, index) => (
        <ContentItem key={index} item={item} bulletStyle={bulletStyle} />
      ))}
      {highlight && <span className={styles.highlight}>{highlight}</span>}
      {ctaText && (
        <button className={styles.cta} onClick={onCtaClick ? onCtaClick : () => window.location.href = `tel:${contact.phone}`}>
          {ctaText}
        </button>
      )}
    </div>
  );
};

const ContentItem: React.FC<{ item: { subTitle?: string; description: string; dots?: string[] }; bulletStyle: 'dot' | 'dash' | 'circle' | 'vIcon' }> = ({ item, bulletStyle }) => {
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<HTMLUListElement>(null);
  const [subTitleVisible, setSubTitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => handleIntersection(entries, observer, setSubTitleVisible), { threshold: 0.1 });
    if (subTitleRef.current) {
      observer.observe(subTitleRef.current);
    }
    return () => {
      if (subTitleRef.current) {
        observer.unobserve(subTitleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => handleIntersection(entries, observer, setDescriptionVisible), { threshold: 0.1 });
    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }
    return () => {
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => handleIntersection(entries, observer, setDotsVisible), { threshold: 0.1 });
    if (dotsRef.current) {
      observer.observe(dotsRef.current);
    }
    return () => {
      if (dotsRef.current) {
        observer.unobserve(dotsRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.contentItem}>
      {item.subTitle && <h3 ref={subTitleRef} className={`${styles.subTitle} ${subTitleVisible ? styles.visible : ''}`}>{item.subTitle}</h3>}
      <p ref={descriptionRef} className={`${styles.description} ${descriptionVisible ? styles.visible : ''}`}>{renderAboutText(item.description)}</p>
      {item.dots && (
        <ul ref={dotsRef} className={`${styles.dotsList} ${styles[bulletStyle]} ${dotsVisible ? styles.visible : ''}`}>
          {item.dots.map((dot, dotIndex) => (
            <li key={dotIndex} style={{ animationDelay: `${dotIndex * 0.2}s` }}>{dot}</li>
          ))}
        </ul>
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