import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { loginSchema } from '../../utils/validators';
import { login as loginApi } from '../../api/authApi';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authLogin = useAuthStore((state) => state.login);
  const showToast = useUiStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginApi(data);
      authLogin(res.data.token, res.data.user);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8">
      <h2 className="text-xl font-bold text-[#171d16] mb-1">Welcome back</h2>
      <p className="text-sm text-[#6f7a6b] mb-6">Sign in to continue your health journey</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Username</label>
          <input
            {...register('username')}
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.username && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.password && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-xs font-semibold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn size={18} />
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#6f7a6b]">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
