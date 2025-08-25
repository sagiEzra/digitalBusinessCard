import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
}

interface UserCards {
  id: string;
  routeName: string;
  name: string;
  headerText: string;
  mainPhoto?: string;
  createdBy: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: AuthUser | null;
  userCards: UserCards[];
  loading: boolean;
  error: string | null;
  refreshUserCards: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userCards: [],
  loading: true,
  error: null,
  refreshUserCards: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userCards, setUserCards] = useState<UserCards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRole = async (uid: string): Promise<string> => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        return userDocSnap.data().role || 'none';
      }
      return 'none';
    } catch (err) {
      console.error('Error fetching user role:', err);
      return 'none';
    }
  };

  const fetchUserCards = async (uid: string): Promise<UserCards[]> => {
    try {
      const q = query(
        collection(db, 'businesses'),
        where('createdBy', '==', uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as UserCards[];
    } catch (err) {
      console.error('Error fetching user cards:', err);
      return [];
    }
  };

  const refreshUserCards = async (): Promise<void> => {
    if (!user) return;
    try {
      const cards = await fetchUserCards(user.uid);
      setUserCards(cards);
    } catch (err) {
      console.error('Error refreshing user cards:', err);
      setError('Failed to refresh cards');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      setLoading(true);
      setError(null);
      
      if (firebaseUser) {
        try {
          const [role, cards] = await Promise.all([
            fetchUserRole(firebaseUser.uid),
            fetchUserCards(firebaseUser.uid)
          ]);
          
          const authUser: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role,
          };
          
          setUser(authUser);
          setUserCards(cards);
        } catch (err) {
          console.error('Error setting up user data:', err);
          setError('Failed to load user data');
          setUser(null);
          setUserCards([]);
        }
      } else {
        setUser(null);
        setUserCards([]);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userCards,
    loading,
    error,
    refreshUserCards,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};