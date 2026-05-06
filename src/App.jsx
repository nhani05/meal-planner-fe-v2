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
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ApiTestPage from './pages/test/ApiTestPage';

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
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
