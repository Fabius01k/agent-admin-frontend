import { createBrowserRouter } from 'react-router';
import { paths } from '@router/path';

export const router = createBrowserRouter([
  {
    path: paths.root,
    element: <div>Home</div>,
  },
  {
    path: paths.actor,
    element: <div>Actor</div>,
  },
  {
    path: paths.auth,
    element: <div>Auth</div>,
  },
]);
