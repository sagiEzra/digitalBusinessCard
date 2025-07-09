import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaEnvelope, FaWaze, FaPlus, FaHome, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';

interface ContactButtonsProps {
    name: string,
    contact: any,
    color: string,
    hoverColor: string,
    highlight?: boolean,
}

export const ContactButtons: React.FC<ContactButtonsProps> = (attrs) => {
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // You can set these as props or context if you want dynamic colors
    const iconsBg = attrs.color || 'linear-gradient(190deg, #317fec, #0b3c74)';
    const iconsHoverBg = attrs.hoverColor || 'linear-gradient(135deg, #317fec, #0b3c74)';

    const handleDownloadContact = () => {
        const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${attrs.name}\nTEL:${attrs.contact.phone}\n${attrs.contact.phone2 ? `TEL:${attrs.contact.phone2}\n` : ''}EMAIL:${attrs.contact.email}\nURL:${attrs.contact.website}\nEND:VCARD`;
        const blob = new Blob([vCardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Social/contact buttons
    const contactLinks = [
        attrs.contact?.whatsapp && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.whatsapp}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="whatsapp"
                target="_blank" rel="noopener noreferrer"
            >
                <FaWhatsapp className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">וואטסאפ</span>
            </a>
        ),
        attrs.contact?.phone && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                onClick={(e) => {
                    e.preventDefault();
                    if (attrs.contact.phone2) {
                        setShowPhoneModal(true);
                    } else {
                        window.location.href = `tel:${attrs.contact.phone}`;
                    }
                }}

                href={`tel:${attrs.contact.phone}`}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="phone"
            >
                <FaPhone className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">התקשר</span>
            </a>
        ),
        attrs.contact?.facebook && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.facebook}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="facebook"
                target="_blank" rel="noopener noreferrer"
            >
                <FaFacebook className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">פייסבוק</span>
            </a>
        ),
        attrs.contact?.instagram && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.instagram}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="instagram"
                target="_blank" rel="noopener noreferrer"
            >
                <FaInstagram className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">אינסטגרם</span>
            </a>
        ),
        attrs.contact?.email && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={`mailto:${attrs.contact.email}`}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="email"
            >
                <FaEnvelope className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">אימייל</span>
            </a>
        ),
        attrs.contact?.catalog && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.catalog}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="catalog"
                target="_blank" rel="noopener noreferrer"
            >
                <FaHome className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">קטלוג</span>
            </a>
        ),
        attrs.contact?.waze && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.waze}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="waze"
                target="_blank" rel="noopener noreferrer"
            >
                <FaWaze className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">ווייז</span>
            </a>
        ),
        attrs.contact?.linkedin && (
            <a
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                href={attrs.contact.waze}
                className={`button flex flex-col items-center justify-center m-[15px] p-[10px] text-white rounded-full no-underline transition-all duration-300 w-20 h-20 md:w-20 md:h-20 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:-translate-y-1.5`}
                key="waze"
                target="_blank" rel="noopener noreferrer"
            >
                <FaLinkedinIn className="icon text-[1.5em] mb-[5px]" />
                <span className="text-[0.8em] font-bold mt-[5px]">לינקדאין</span>
            </a>
        ),
    ].filter(Boolean);

    // Arrange in rows of 3
    const rows = [];
    for (let i = 0; i < contactLinks.length; i += 3) {
        rows.push(contactLinks.slice(i, i + 3));
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowPhoneModal(false);
            }
        };

        if (showPhoneModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPhoneModal]);

    return (
        <React.Fragment>
            <div className={`socialLinks flex flex-col items-center ${attrs.highlight ? 'border-2 border-blue-500 rounded-xl' : ''}`}>
                {rows.map((row, idx) => (
                    <div className="row flex flex-row justify-around w-[90%]" key={idx}>
                        {row}
                    </div>
                ))}
            </div>

            <button
                style={{
                    background: iconsBg
                }}
                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                onMouseOut={e => e.currentTarget.style.background = iconsBg}

                onClick={handleDownloadContact}
                className={`addContactButton flex w-full items-center justify-center text-sm font-medium mt-10 mb-0 px-5 py-4 text-white border-2 border-black rounded-[18px] no-underline transition-all duration-300 text-center cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)]`}
            >
                <span>שמרו אותי באנשי הקשר</span>
                <FaPlus className="plusIcon text-[1.5em] mr-2" />
            </button>

            {showPhoneModal && (
                <div className="modal fixed inset-0 z-[1000] w-full h-full bg-black/50 flex items-center justify-center">
                    <div ref={modalRef} className="modalContent bg-white p-5 rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] relative text-center w-[320px] max-w-[90vw]">
                        <button
                            onClick={() => setShowPhoneModal(false)}
                            className="closeButton absolute top-[5px] right-[8px] bg-none border-none text-[1.9em] cursor-pointer p-0 text-black hover:text-red-500 transition"
                            aria-label="סגור"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold text-blue-900 mb-4">התקשר</h2>
                        <div className="phoneNumbers flex flex-col items-center">
                            <a
                                style={{
                                    background: iconsBg
                                }}
                                onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                                onMouseOut={e => e.currentTarget.style.background = iconsBg}
                                href={`tel:${attrs.contact.phone}`}
                                className={`phoneNumber flex items-center justify-evenly min-w-[110px] text-white border-none px-5 py-2 text-base rounded-[15px] cursor-pointer transition-all duration-300 my-2 no-underline hover:scale-105`}>

                                <FaPhone className="icon mr-2" />
                                <span>{attrs.name || 'מספר ראשי'}</span>
                            </a>
                            {attrs.contact.phone2 && (
                                <a
                                    style={{
                                        background: iconsBg
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                                    onMouseOut={e => e.currentTarget.style.background = iconsBg}
                                    href={`tel:${attrs.contact.phone2}`}
                                    className={`phoneNumber flex items-center justify-evenly min-w-[110px] text-white border-none px-5 py-2 text-base rounded-[15px] cursor-pointer transition-all duration-300 my-2 no-underline hover:scale-105`}>

                                    <FaPhone className="icon mr-2" />
                                    <span>{attrs.contact.phone2Name || 'מספר נוסף'}</span>
                                </a>
                            )}
                            {attrs.contact.phone3 && (
                                <a style={{
                                    background: iconsBg
                                }}
                                    onMouseOver={e => e.currentTarget.style.background = iconsHoverBg}
                                    onMouseOut={e => e.currentTarget.style.background = iconsBg}
                                    href={`tel:${attrs.contact.phone3}`}
                                    className={`phoneNumber flex items-center justify-evenly min-w-[110px] text-white border-none px-5 py-2 text-base rounded-[15px] cursor-pointer transition-all duration-300 my-2 no-underline hover:scale-105`}>
                                    
                                    <FaPhone className="icon mr-2" />
                                    <span>{attrs.contact.phone3Name || 'מספר נוסף'}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};