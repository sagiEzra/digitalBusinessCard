import React, { useRef, useEffect, useState } from 'react';
import { FaCheckCircle, FaDotCircle, FaMinusCircle, FaCircle } from 'react-icons/fa';

interface AboutProps {
  contact: any;
  title: string;
  content: { subTitle?: string; description: string; dots?: string[], dotsIcon?: 'dot' | 'dash' | 'circle' | 'vIcon' }[];
  highlight?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
  color?: string;
  hoverColor?: string;
}

const handleIntersection = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (entries[0].isIntersecting) {
    setVisible(true);
    observer.disconnect();
  }
};

const defaultBulletStyle = 'vIcon';

export const About: React.FC<AboutProps> = ({
  contact,
  title,
  content,
  highlight,
  ctaText,
  onCtaClick,
  color,
  hoverColor
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const iconsBg = color || 'linear-gradient(190deg, #317fec, #0b3c74)';
  const iconsHoverBg = hoverColor || 'linear-gradient(135deg, #317fec, #0b3c74)';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => handleIntersection(entries, observer, setTitleVisible),
      { threshold: 0.1 }
    );
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
    <div className={`flex flex-col items-center justify-center my-12 text-center p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-[0_0_32px_0_rgba(0,0,0,0.18)] max-w-3xl mx-auto ${highlight ? 'border-2 border-blue-500' : ''}`}>
      <h2
        ref={titleRef}
        className={`text-3xl md:text-4xl font-extrabold text-black mb-10 tracking-tight transition-all duration-1000 ease-in-out opacity-0 translate-y-5 ${titleVisible ? 'opacity-100 translate-y-0' : ''
          }`}
      >
        {title}
      </h2>
      <div className="w-full flex flex-col gap-8">
        {content?.map((item, index) => (
          <ContentItem key={index} item={item} />
        ))}
      </div>
      {ctaText && (
        <button
          style={{
            background: iconsBg
          }}
          onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
          onMouseOut={e => e.currentTarget.style.background = iconsBg}
          className="mt-6 px-8 py-3 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 tracking-wide"
          onClick={onCtaClick ? onCtaClick : () => window.location.href = `tel:${contact.phone}`}
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

const ContentItem: React.FC<{
  item: {
    subTitle?: string;
    description: string;
    dots?: string[];
    dotsIcon?: 'dot' | 'dash' | 'circle' | 'vIcon';
  };
}> = ({ item }) => {
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<HTMLUListElement>(null);
  const [subTitleVisible, setSubTitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => handleIntersection(entries, observer, setSubTitleVisible),
      { threshold: 0.1 }
    );
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
    const observer = new IntersectionObserver(
      (entries) => handleIntersection(entries, observer, setDescriptionVisible),
      { threshold: 0.1 }
    );
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
    const observer = new IntersectionObserver(
      (entries) => handleIntersection(entries, observer, setDotsVisible),
      { threshold: 0.1 }
    );
    if (dotsRef.current) {
      observer.observe(dotsRef.current);
    }
    return () => {
      if (dotsRef.current) {
        observer.unobserve(dotsRef.current);
      }
    };
  }, []);

  // Bullet icon mapping
  const getDotIcon = () => {
    switch (item.dotsIcon ?? defaultBulletStyle) {
      case 'dot':
        return <FaDotCircle className="text-blue-400 text-lg min-w-[1.5em]" />;
      case 'dash':
        return <FaMinusCircle className="text-blue-400 text-lg min-w-[1.5em]" />;
      case 'circle':
        return <FaCircle className="text-blue-400 text-lg min-w-[1.5em]" />;
      case 'vIcon':
        return <FaCheckCircle className="text-green-500 text-lg min-w-[1.5em]" />;
      default:
        return <FaCheckCircle className="text-green-500 text-lg min-w-[1.5em]" />;
    }
  };

  return (
    <div className="my-4 flex flex-col gap-4 items-center w-full">
      {item.subTitle && (
        <h3
          ref={subTitleRef}
          className={`inline-block text-2xl font-bold text-black border-b-2 border-blue-300 mb-2 pb-1 transition-all duration-1000 ease-in-out opacity-0 ${subTitleVisible ? 'opacity-100' : ''
            }`}
        >
          {item.subTitle}
        </h3>
      )}
      <p
        ref={descriptionRef}
        className={`text-xl md:text-2xl font-medium leading-relaxed text-gray-800 max-w-2xl mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-5 ${descriptionVisible ? 'opacity-100 translate-y-0' : ''
          }`}
      >
        {renderAboutText(item.description)}
      </p>
      {item.dots && (
        <ul
          ref={dotsRef}
          className={`mt-4 mb-2 flex flex-col items-center gap-2 font-semibold text-black transition-all duration-1000 ease-in-out opacity-0 translate-y-5 ${dotsVisible ? 'opacity-100 translate-y-0' : ''
            }`}
        >
          {item.dots.map((dot, dotIndex) => (
            <li
              key={dotIndex}
              className="flex flex-row gap-2 items-center text-lg md:text-xl mb-1 animate-fadeInLeft w-full"
              style={{
                animationDelay: `${dotIndex * 0.2 + 0.5}s`,
              }}
            >
              <span className="mr-6">{getDotIcon()}</span>
              <span className="flex-1 text-right text-lg md:text-xl">{dot}</span>
            </li>
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