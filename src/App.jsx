import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Toast from './components/common/Toast';
import Layout from './components/layout/Layout';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './pages/Dashboard';
import TodaysMeals from './pages/TodaysMeals';
import MealPlanner from './pages/MealPlanner';
import Recipes from './pages/Recipes';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ApiTestPage from './pages/test/ApiTestPage';
import AdminRoute from './components/common/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDishes from './pages/admin/AdminDishes';
import AdminCategories from './pages/admin/AdminCategories';
import AdminFeedbacks from './pages/admin/AdminFeedbacks';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/test-api" element={<ApiTestPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="meals" element={<TodaysMeals />} />
            <Route path="planner" element={<MealPlanner />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="templates" element={<Templates />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="dishes" element={<AdminDishes />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="feedbacks" element={<AdminFeedbacks />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
