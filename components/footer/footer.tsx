import React from 'react';

export const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-white to-blue-150 text-gray-900 pt-0 pb-2 shadow-inner">
            {/* Decorative SVG wave on top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-16">
                    <defs>
                        <linearGradient id="footer-gradient" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3b82f6" />
                            <stop offset="1" stopColor="#fff" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z"
                        fill="url(#footer-gradient)"
                        opacity="0.8"
                    />
                    <path
                        d="M0,60 C480,100 960,20 1440,60 L1440,0 L0,0 Z"
                        fill="#60a5fa"
                        opacity="0.5"
                    />
                </svg>
            </div>
            <div className="container mx-auto px-4 flex flex-col items-center gap-2 pt-12">
                <span className="text-base font-medium tracking-wide text-blue-900 drop-shadow-sm">
                    כרטיס ביקור דיגיטלי - הכול במקום אחד
                </span>
                <a
                    href={process.env.NEXT_PUBLIC_BASE_URL || '/'}
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-base px-7 py-2.5 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    צור כרטיס
                </a>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>© {new Date().getFullYear()} Digital Card</span>
                </div>
            </div>
        </footer>
    );
};