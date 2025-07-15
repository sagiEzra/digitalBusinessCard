import React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  animationDelay?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  subtitle,
  features,
  buttonText,
  onButtonClick,
  animationDelay,
}) => (
  <div
    className="bg-white rounded-3xl shadow-xl border border-blue-200 p-10 flex-1 max-w-md text-center animate-fadeIn"
    style={animationDelay ? { animationDelay } : {}}
  >
    <h3 className="text-3xl font-bold mb-4 text-blue-900">{title}</h3>
    <div className="text-5xl font-extrabold text-blue-700 mb-4">{price}</div>
    {subtitle && <div className="text-lg font-extrabold text-blue-700 mb-4">{subtitle}</div>}
    <ul dir="rtl" className="text-blue-700 text-lg mb-8 space-y-2">
      {features.map((feature, idx) => (
        <li key={idx}>✔️ {feature}</li>
      ))}
    </ul>
    <button
      onClick={onButtonClick}
      className="bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-blue-900 font-bold text-xl px-10 py-5 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
    >
      {buttonText}
    </button>
  </div>
);

export default PricingCard; 