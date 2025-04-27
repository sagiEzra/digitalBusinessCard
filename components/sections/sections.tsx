import React, { useState } from 'react';
import styles from './sections.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SectionsProps {
  sections: { subTitle: string; content: string }[];
}

export const Sections: React.FC<SectionsProps> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const handleToggleSection = (index: number) => {
    setOpenSections(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className={styles.sections}>
      {sections.map((section, index) => (
        <div key={index} className={`${styles.section} ${openSections[index] ? styles.open : ''}`}>
          <button className={styles.sectionHeader} onClick={() => handleToggleSection(index)}>
            <span className={styles.subTitle}>{section.subTitle}</span>
            <span className={`${styles.icon} ${openSections[index] ? styles.open : ''}`}>
              {openSections[index] ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          <div className={`${styles.sectionContent} ${openSections[index] ? styles.open : ''}`}>
            {renderAboutText(section.content)}
          </div>
        </div>
      ))}
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


