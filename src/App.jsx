import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Toast from './components/common/Toast';
import AdminRoute from './components/common/AdminRoute';

const Layout = lazy(() => import('./components/layout/Layout'));
const AuthLayout = lazy(() => import('./components/auth/AuthLayout'));
const LandingLayout = lazy(() => import('./components/landing/LandingLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TodaysMeals = lazy(() => import('./pages/TodaysMeals'));
const MealPlanner = lazy(() => import('./pages/MealPlanner'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Templates = lazy(() => import('./pages/Templates'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminDishes = lazy(() => import('./pages/admin/AdminDishes'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminFeedbacks = lazy(() => import('./pages/admin/AdminFeedbacks'));
const AdminAuditLogs = lazy(() => import('./pages/admin/AdminAuditLogs'));
const Home = lazy(() => import('./pages/landing/Home'));
const Features = lazy(() => import('./pages/landing/Features'));
const About = lazy(() => import('./pages/landing/About'));
const Contact = lazy(() => import('./pages/landing/Contact'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5fbef] text-sm font-semibold text-[#006e1c]">
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
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
      </Suspense>
    </BrowserRouter>
  );
}
