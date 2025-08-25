import { signOut, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useAuthContext, AuthUser } from './AuthContext';
import { roleLimits } from '../roles';

interface UseAuthReturn {
  user: AuthUser | null;
  userCards: any[];
  loading: boolean;
  error: string | null;
  refreshUserCards: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  canCreateCard: boolean;
  cardLimit: number;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const { user, userCards, loading, error, refreshUserCards } = useAuthContext();

  const signIn = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      throw new Error('Authentication failed');
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      throw new Error('Sign out failed');
    }
  };

  const cardLimit = user ? (roleLimits[user.role] ?? 0) : 0;
  const canCreateCard = user ? (cardLimit === Infinity || userCards.length < cardLimit) : false;
  const isAuthenticated = !!user;

  return {
    user,
    userCards,
    loading,
    error,
    refreshUserCards,
    signIn,
    signOut: handleSignOut,
    canCreateCard,
    cardLimit,
    isAuthenticated,
  };
};