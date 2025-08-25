import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useAuth } from './useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  showLoading?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  requireAuth = true,
  showLoading = true,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.replace(redirectTo);
      } else if (!requireAuth && user) {
        router.replace('/manage');
      }
    }
  }, [loading, user, requireAuth, router, redirectTo]);

  if (loading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="text-blue-700 text-xl font-bold fade-in">טוען...</div>
      </div>
    );
  }

  if (requireAuth && !user && !loading) {
    return null;
  }

  if (!requireAuth && user && !loading) {
    return null;
  }

  return <>{children}</>;
};