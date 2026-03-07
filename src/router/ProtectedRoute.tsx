import { Navigate } from 'react-router';
import { paths } from '@router/path';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return <Navigate to={paths.auth} replace />;
  }

  return children;
};
