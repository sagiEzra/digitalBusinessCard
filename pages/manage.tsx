"use client"

import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";

const ManagePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sidebarSelected, setSidebarSelected] = useState<'cards' | 'create'>('cards');
  const [userCards, setUserCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUser(u);
      // Check if business doc exists for this user (by uid)

      const identifier = u.uid;
      // 👇 Check role from Firestore
      const userDocRef = doc(db, "users", identifier);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const isAdminUser = userDocSnap.data().isAdmin;
        setIsAdmin(isAdminUser);
      } else {
        setIsAdmin(false);
      }
      // Fetch all cards for this user
      const q = query(
        collection(db, "businesses"),
        where("createdBy", "==", identifier)
      );
      const querySnapshot = await getDocs(q);
      const cards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserCards(cards);
    });
    return () => unsubscribe();
  }, [router]);

  const handleCreateCard = () => {
    console.log(userCards.length === 0 || isAdmin)
    if (userCards.length === 0 || isAdmin) {
      setSidebarSelected('create');
      router.push("/create");
    }
  };

  const handleUpgrade = () => {
    alert("פנה אלינו לשדרוג!");
  };

  const handleEditCard = (routeName: string) => {
    router.push(`/${routeName}/edit`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="text-blue-700 text-xl font-bold">טוען...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-blue-200 shadow-xl flex flex-col p-6">
        <nav className="flex flex-col gap-6 mt-10">
          <button
            className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all ${sidebarSelected === 'cards' ? 'bg-blue-200 text-blue-900 border-2 border-blue-700 shadow hover:bg-blue-300' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}
            onClick={() => setSidebarSelected('cards')}
          >
            הכרטיסים שלי
          </button>
          <div className="relative">
            <button
              className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all ${sidebarSelected === 'create' ? 'bg-blue-200 text-blue-900 shadow' : (userCards.length !== 0 && !isAdmin) ? 'bg-gray-200 text-blue-900 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'}`}
              onClick={() => handleCreateCard()}
              disabled={!isAdmin}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              tabIndex={0}
            >
              צור כרטיס חדש
            </button>
            {!isAdmin && showTooltip && (
              <div className="absolute right-0 -top-12 bg-blue-700 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 whitespace-nowrap">
                לכרטיסים נוספים בקלות - שדרג
              </div>
            )}
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="w-full flex items-center justify-between bg-white border-b border-blue-200 px-8 py-4 shadow-md">
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img src={user.photoURL} alt="profile" className="w-12 h-12 rounded-full border-2 border-blue-400" />
            )}
            <span className="text-blue-900 font-bold text-lg">{user.displayName || user.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleUpgrade}
              className="py-2 px-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              שדרג
            </button>
            <button
              onClick={() => signOut(auth)}
              className="py-2 px-4 rounded-full bg-gray-200 text-blue-900 font-medium hover:bg-gray-300 transition-all"
            >
              התנתק
            </button>
          </div>
        </header>
        {/* Content */}
        <section className="flex-1 flex items-center justify-center">
          {sidebarSelected === 'cards' ? (
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
              {userCards.length === 0 ? (
                <div className="col-span-full text-blue-700 text-lg font-bold text-center">לא נמצאו כרטיסים</div>
              ) : userCards.map(card => (
                <div key={card.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 p-4 flex flex-col gap-2 relative">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-blue-900 font-bold text-lg">{card.name}</span>
                    <span className="text-blue-700 text-sm">{card.headerText}</span>
                  </div>
                  <a
                    href={`/${card.routeName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs underline mb-2"
                  >
                    לצפייה בכרטיס
                  </a>
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2 border border-blue-50">
                    {card.mainPhoto ? (
                      <img src={card.mainPhoto} alt="preview" className="h-full object-contain" style={{ maxWidth: '100%' }} />
                    ) : (
                      <span className="text-blue-300">אין תצוגה</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditCard(card.routeName)}
                    className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-200 transition-all"
                  >
                    ערוך
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ManagePage;
