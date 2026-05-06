import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function AdminRoute() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
