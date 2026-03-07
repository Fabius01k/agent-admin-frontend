import { createBrowserRouter } from 'react-router';
import { paths } from '@router/path';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from '@pages/home/HomePage';
import { AuthPage } from '@pages/auth/AuthPage';
import { ActorPage } from '@pages/actor/ActorPage';

export const router = createBrowserRouter([
  {
    path: paths.root,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `${paths.actor}/:id`,
    element: (
      <ProtectedRoute>
        <ActorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.auth,
    element: <AuthPage />,
  },
]);
