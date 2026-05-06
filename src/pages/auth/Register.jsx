import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { registerSchema } from '../../utils/validators';
import { register as registerApi } from '../../api/authApi';
import { useUiStore } from '../../stores/uiStore';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const showToast = useUiStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerApi(data);
      showToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8">
      <h2 className="text-xl font-bold text-[#171d16] mb-1">Create account</h2>
      <p className="text-sm text-[#6f7a6b] mb-6">Start your personalized nutrition journey</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Username</label>
          <input
            {...register('username')}
            type="text"
            placeholder="Choose a username"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.username && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.email && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.password && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">Confirm Password</label>
          <input
            {...register('passwordConfirm')}
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.passwordConfirm && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.passwordConfirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus size={18} />
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#6f7a6b]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
