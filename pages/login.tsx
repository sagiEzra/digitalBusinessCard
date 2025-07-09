"use client"

import React, { useEffect } from "react";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/manage");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.replace("/manage");
    } catch (err) {
      alert("שגיאה בהתחברות עם גוגל");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">נהלו וצרו כרטיסי ביקור דיגיטליים בקלות</h1>
        <button
          onClick={handleLogin}
          className="w-full py-4 px-6 rounded-full font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.52-6.656-2.52-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.68z" fill="#fff"/>
              <path d="M12.04 22c2.7 0 4.96-.89 6.61-2.41l-3.16-2.58c-.87.61-2.01.98-3.45.98-2.65 0-4.89-1.79-5.69-4.19h-3.32v2.63c1.64 3.23 5.06 5.57 9.01 5.57z" fill="#34A853"/>
              <path d="M6.35 13.8c-.2-.61-.32-1.25-.32-1.8s.12-1.19.32-1.8v-2.63h-3.32c-.67 1.33-1.06 2.81-1.06 4.43s.39 3.1 1.06 4.43l3.32-2.63z" fill="#FBBC05"/>
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.52-6.656-2.52-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.68z" fill="#4285F4"/>
              <path d="M12.04 4.75c1.48 0 2.48.64 3.05 1.18l2.23-2.18c-1.36-1.26-3.12-2-5.28-2-3.95 0-7.37 2.34-9.01 5.57l3.32 2.63c.8-2.4 3.04-4.19 5.69-4.19z" fill="#EA4335"/>
            </g>
          </svg>
          התחבר עם Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
