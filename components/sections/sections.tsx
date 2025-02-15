import { useState } from 'react';
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
            {sections.map((section: any, index: number) => (
                <div key={index} className={styles.section}>
                    <button className={styles.sectionHeader} onClick={() => handleToggleSection(index)}>
                        <span>{section.subTitle}</span>
                        {openSections[index] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {openSections[index] && <div className={styles.sectionContent}>{section.content}</div>}
                </div>
            ))}
        </div>
    )
}


