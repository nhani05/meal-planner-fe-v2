import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, CheckCircle } from 'lucide-react';
import { resetPasswordSchema } from '../../utils/validators';
import { resetPassword as resetPasswordApi } from '../../api/authApi';
import { useUiStore } from '../../stores/uiStore';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const showToast = useUiStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPasswordApi(data);
      showToast('Password reset successful!', 'success');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to reset password';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#eaf0e4] flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-[#4caf50]" />
        </div>
        <h2 className="text-xl font-bold text-[#171d16] mb-2">Password reset!</h2>
        <p className="text-sm text-[#6f7a6b] mb-6">Your password has been reset successfully.</p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 px-8 rounded-xl transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8">
      <h2 className="text-xl font-bold text-[#171d16] mb-1">New password</h2>
      <p className="text-sm text-[#6f7a6b] mb-6">Enter the OTP and your new password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">OTP Code</label>
          <input
            {...register('token')}
            type="text"
            placeholder="Enter OTP from email"
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.token && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.token.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">New Password</label>
          <div className="relative">
            <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
            <input
              {...register('newPassword')}
              type="password"
              placeholder="Enter new password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
            />
          </div>
          {errors.newPassword && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <KeyRound size={18} />
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#6f7a6b]">
          Remember your password?{' '}
          <Link to="/login" className="font-bold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
