import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CarDetailPage from './pages/CarDetail';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/cars/vf-8" replace /> },
  { path: '/cars', element: <Navigate to="/cars/vf-8" replace /> },
  { path: '/cars/:modelSlug', element: <CarDetailPage /> },
  { path: '*', element: <Navigate to="/cars/vf-8" replace /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
