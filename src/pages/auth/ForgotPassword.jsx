import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createForgotPasswordSchema } from '../../utils/validators';
import { forgotPassword as forgotPasswordApi } from '../../api/authApi';
import { useUiStore } from '../../stores/uiStore';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [devOtp, setDevOtp] = useState(null);
  const showToast = useUiStore((state) => state.showToast);
  const schema = useMemo(() => createForgotPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await forgotPasswordApi(data);
      showToast(res.data.message || t('toast.otpSent'), 'success');
      if (res.data.devOtp) {
        setDevOtp(res.data.devOtp);
      }
      // Redirect to reset password page after a short delay
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || t('auth.sendOtp');
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8">
      <h2 className="text-xl font-bold text-[#171d16] mb-1">{t('auth.forgotTitle')}</h2>
      <p className="text-sm text-[#6f7a6b] mb-6">{t('auth.forgotSubtitle')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">{t('auth.email')}</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
            <input
              {...register('email')}
              type="email"
              placeholder={t('auth.enterEmail')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.email.message}</p>
          )}
        </div>

        {devOtp && (
          <div className="p-3 rounded-lg bg-[#eaf0e4] border border-[#4caf50]/30">
            <p className="text-xs font-semibold text-[#006e1c]">Development OTP: {devOtp}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('auth.sendingOtp') : t('auth.sendOtp')}
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#6f7a6b]">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to="/login" className="font-bold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            {t('auth.signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}
