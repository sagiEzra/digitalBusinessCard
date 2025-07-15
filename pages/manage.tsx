"use client"

import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { roleLimits } from '../lib/roles';
import { FaInfinity, FaPen, FaTrash } from "react-icons/fa";
import { theme } from '../styles/theme';

// Helper to extract public_id from Cloudinary URL
function publicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/i);
  return match ? match[1] : null;
}

const ManagePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('none');
  const [showTooltip, setShowTooltip] = useState(false);
  const [sidebarSelected, setSidebarSelected] = useState<'cards' | 'create'>('cards');
  const [userCards, setUserCards] = useState<any[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null); // <-- add state
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
      let userRole = 'none';
      if (userDocSnap.exists()) {
        userRole = userDocSnap.data().role || 'none';
        setRole(userRole);
      } else {
        setRole('none');
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
    if (userCards.length === 0 || role !== 'none') {
      setSidebarSelected('create');
      router.push("/create");
    }
  };

  const handleUpgrade = () => {
    router.push("/upgrade");
  };

  const handleEditCard = (routeName: string) => {
    router.push(`/${routeName}/edit`);
  };

  // Card limits by role
  const cardLimit = roleLimits[role] ?? 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="text-blue-700 text-xl font-bold fade-in">טוען...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Sidebar */}
      <aside className="w-64 glass flex flex-col p-8 shadow-2xl border-none rounded-2xl fade-in-up">
        <nav className="flex flex-col gap-8 mt-12">
          <button
            className={`w-full py-4 px-6 rounded-2xl font-bold text-xl transition-all duration-300 ${sidebarSelected === 'cards' ? 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 shadow-2xl scale-105' : 'bg-white/80 text-blue-900 hover:bg-blue-100/80'}`}
            onClick={() => setSidebarSelected('cards')}
            style={{ boxShadow: sidebarSelected === 'cards' ? theme.shadows.cardHover : theme.shadows.card }}
          >
            הכרטיסים שלי
          </button>
          <div className="relative">
            <button
              className={`w-full py-4 px-6 rounded-2xl font-bold text-xl transition-all duration-300 ${sidebarSelected === 'create' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-2xl scale-105' : (userCards.length !== 0 && cardLimit !== Infinity && userCards.length >= cardLimit) ? 'bg-gray-200 text-blue-900 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'}`}
              onClick={() => handleCreateCard()}
              disabled={cardLimit !== Infinity && userCards.length >= cardLimit}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              tabIndex={0}
              style={{ boxShadow: sidebarSelected === 'create' ? theme.shadows.cardHover : theme.shadows.card }}
            >
              צור כרטיס חדש
            </button>
            <div className="flex justify-center mt-10">
              <div
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-2xl border-0 fade-in-up ${cardLimit === Infinity ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 'bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-blue-800'}`}
                style={{ fontSize: '1.1rem', minWidth: '140px', boxShadow: theme.shadows.cardHover }}
              >
                <span className="text-2xl">
                  {cardLimit === Infinity ? <FaInfinity /> : cardLimit}
                </span>
                <span className="text-blue-700 text-lg font-normal">/</span>
                <span className="text-2xl font-extrabold">{userCards.length}</span>
                <span className="text-blue-700 text-base font-medium ml-1">כרטיסים</span>
              </div>
            </div>
            {cardLimit !== Infinity && userCards.length >= cardLimit && showTooltip && (
              <div className="absolute right-0 -top-14 bg-blue-700 text-white text-sm rounded-2xl px-4 py-3 shadow-2xl z-10 whitespace-nowrap fade-in-up" style={{ boxShadow: theme.shadows.tooltip }}>
                לכרטיסים נוספים בקלות - שדרג
              </div>
            )}
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="w-full flex items-center justify-between glass px-10 py-6 shadow-2xl rounded-b-2xl fade-in-up">
          <div className="flex items-center gap-6">
            {user.photoURL && (
              <img src={user.photoURL} alt="profile" className="w-14 h-14 rounded-full border-4 border-blue-400 shadow-2xl" />
            )}
            <span className="text-blue-900 font-bold text-xl" style={{ fontFamily: theme.fontFamily }}>{user.displayName || user.email}</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleUpgrade}
              className="py-3 px-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-xl shadow-2xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 glow"
              style={{ boxShadow: theme.shadows.cardHover }}
            >
              שדרג
            </button>
            <button
              onClick={() => signOut(auth)}
              className="py-3 px-6 rounded-full bg-gray-200 text-blue-900 font-medium text-lg hover:bg-gray-300 transition-all duration-300 shadow"
              style={{ borderRadius: theme.radii.button }}
            >
              התנתק
            </button>
          </div>
        </header>
        {/* Content */}
        <section className="flex-1 flex items-center justify-center fade-in-up">
          {sidebarSelected === 'cards' ? (
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-10">
              {userCards.length === 0 ? (
                <div className="col-span-full text-blue-700 text-2xl font-bold text-center fade-in-up">לא נמצאו כרטיסים</div>
              ) : userCards.map(card => (
                <div key={card.id} className="glass rounded-2xl shadow-2xl border-0 p-6 flex flex-col gap-4 relative transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_0_rgba(44,120,220,0.22)] fade-in-up">
                  <div className="flex flex-col gap-2 mb-2">
                    <span className="text-blue-900 font-bold text-xl" style={{ fontFamily: theme.fontFamily }}>{card.name}</span>
                    <span className="text-blue-700 text-base">{card.headerText}</span>
                  </div>
                  <a
                    href={`/${card.routeName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mb-2 hover:text-blue-800 transition-colors"
                  >
                    לצפייה בכרטיס
                  </a>
                  <div className="w-full h-32 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden mb-2 border border-blue-50 shadow" style={{ borderRadius: theme.radii.card }}>
                    {card.mainPhoto ? (
                      <img src={card.mainPhoto} alt="preview" className="h-full object-contain" style={{ maxWidth: '100%' }} />
                    ) : (
                      <span className="text-blue-300">אין תצוגה</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCard(card.routeName)}
                      className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-300 text-blue-700 hover:from-blue-200 transition-all duration-300 shadow-sm"
                      style={{ boxShadow: theme.shadows.input }}
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => setPendingDeleteId(card.id)}
                      className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-300 shadow-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/* Confirmation Popup rendered ONCE, outside the card grid */}
          {pendingDeleteId && (() => {
            const card = userCards.find(c => c.id === pendingDeleteId);
            if (!card) return null;
            return (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
                <div className="glass rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 min-w-[300px]">
                  <span className="text-blue-900 text-lg font-bold">האם אתה בטוח שברצונך למחוק את הכרטיס?</span>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => setPendingDeleteId(null)}
                      className="py-2 px-6 rounded-full bg-gray-200 text-blue-900 font-medium text-lg hover:bg-gray-300 transition-all duration-300 shadow"
                      style={{ borderRadius: theme.radii.button }}
                    >
                      ביטול
                    </button>
                    <button
                      onClick={async () => {
                        // Delete the business document from Firestore
                        const businessDocRef = doc(db, "businesses", card.id);
                        getDoc(businessDocRef).then(async docSnap => {
                          if (docSnap.exists()) {
                            // Collect all Cloudinary public IDs to delete
                            const data = docSnap.data();
                            const publicIds: string[] = [];
                            // coverImage
                            if (typeof data.coverImage === 'string' && data.coverImage.includes('cloudinary.com')) {
                              const id = publicIdFromUrl(data.coverImage);
                              if (id) publicIds.push(id);
                            }
                            // mainPhoto
                            if (typeof data.mainPhoto === 'string' && data.mainPhoto.includes('cloudinary.com')) {
                              const id = publicIdFromUrl(data.mainPhoto);
                              if (id) publicIds.push(id);
                            }
                            // gallery
                            if (Array.isArray(data.gallery)) {
                              data.gallery.forEach((url: string) => {
                                if (typeof url === 'string' && url.includes('cloudinary.com')) {
                                  const id = publicIdFromUrl(url);
                                  if (id) publicIds.push(id);
                                }
                              });
                            }
                            // Delete images from Cloudinary if any
                            if (publicIds.length > 0) {
                              await fetch('/api/delete-cloudinary-image', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ publicIds }),
                              });
                            }
                            // Delete Firestore doc
                            await deleteDoc(businessDocRef);
                            setUserCards(prevCards => prevCards.filter(c => c.id !== card.id));
                          }
                          setPendingDeleteId(null);
                        }).catch(error => {
                          console.error("Error deleting business document:", error);
                          setPendingDeleteId(null);
                        });
                      }}
                      className="py-2 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white font-bold text-lg shadow-2xl hover:from-red-500 hover:to-red-700 transition-all duration-300"
                      style={{ borderRadius: theme.radii.button }}
                    >
                      אישור
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      </main>
    </div>
  );
};

export default ManagePage;
