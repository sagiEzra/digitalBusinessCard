import React, { useState } from "react";

interface PaymentSectionProps {
  title: string;
  price: string;
  onPaymentSuccess?: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ title, price, onPaymentSuccess }) => {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setPaid(true);
      setLoading(false);
      if (onPaymentSuccess) onPaymentSuccess();
    }, 1500); // Mock payment delay
  };

  if (paid) {
    return (
      <div className="bg-green-100 border border-green-300 rounded-xl p-8 text-center mt-8">
        <h3 className="text-2xl font-bold text-green-800 mb-2">התשלום התקבל בהצלחה!</h3>
        <p className="text-green-700">תודה שבחרת לשדרג את הכרטיס שלך.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-blue-200 rounded-xl p-8 text-center mt-8 shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-blue-900 mb-2">לתשלום עבור: {title}</h3>
      <div className="text-4xl font-extrabold text-blue-700 mb-4">{price}</div>
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "טוען..." : "שלם עכשיו"}
      </button>
    </div>
  );
};

export default PaymentSection; 