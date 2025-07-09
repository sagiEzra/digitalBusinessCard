import React, { useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SectionsProps {
  sections: { subTitle: string; content: string }[];
  highlight?: boolean;
}

export const Sections: React.FC<SectionsProps> = ({ sections, highlight }) => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleToggleSection = (index: number) => {
    setOpenSections(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className={`w-full my-6 ${highlight ? 'border-2 border-blue-500' : ''}`}>
      {sections?.map((section, index) => {
        const isOpen = !!openSections[index];
        return (
          <div
            key={index}
            className={`mb-3 border rounded-xl transition-all duration-300 ${
              isOpen
                ? 'bg-white border-blue-500 shadow-lg'
                : 'bg-whites border-gray-300'
            }`}
          >
            <button
              className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-[#333] rounded-t-xl border-b border-gray-200 transition-all duration-300 focus:outline-none ${
                isOpen ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleToggleSection(index)}
              aria-expanded={isOpen}
              aria-controls={`section-content-${index}`}
            >
              <span className="mr-2">{section.subTitle}</span>
              <span
                className={`ml-2 transition-transform duration-300 flex items-center ${
                  isOpen ? 'rotate-180 text-blue-500' : 'text-gray-400'
                }`}
              >
                <FaChevronDown size={20} />
              </span>
            </button>
            <div
              id={`section-content-${index}`}
              ref={el => { contentRefs.current[index] = el; }}
              style={
                isOpen
                  ? {
                      maxHeight: contentRefs.current[index]?.scrollHeight
                        ? `${contentRefs.current[index]!.scrollHeight + 20}px`
                        : '500px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                    }
                  : { maxHeight: 0, paddingTop: 0, paddingBottom: 0 }
              }
              className={`overflow-hidden px-6 text-base text-gray-700 transition-all duration-500 ease-in-out`}
            >
              <div>
                {renderAboutText(section.content)}
              </div>
            </div>
          </div>
        );
      })}
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