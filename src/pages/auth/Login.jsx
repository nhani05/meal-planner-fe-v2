import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createLoginSchema } from '../../utils/validators';
import { login as loginApi } from '../../api/authApi';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lockoutInfo, setLockoutInfo] = useState(null);
  const authLogin = useAuthStore((state) => state.login);
  const showToast = useUiStore((state) => state.showToast);
  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const switchAccount = () => {
    setLockoutInfo(null);
    reset({ username: '', password: '' });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setLockoutInfo(null);
    try {
      const res = await loginApi(data);
      authLogin(res.data.token, res.data.user);
      showToast(t('toast.loginSuccess'), 'success');
      navigate('/dashboard');
    } catch (err) {
      // Handle account lockout (423 Locked)
      if (err.response?.status === 423) {
        const lockData = err.response.data;
        setLockoutInfo(lockData);
        showToast(lockData.message || t('auth.accountLockedMessage'), 'error');
      } else {
        const msg = err.response?.data?.message || err.message || t('toast.loginFailed');
        showToast(msg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-8">
      <h2 className="text-xl font-bold text-[#171d16] mb-1">{t('auth.welcomeBack')}</h2>
      <p className="text-sm text-[#6f7a6b] mb-6">{t('auth.signInSubtitle')}</p>

      {/* Account Lockout Warning */}
      {lockoutInfo && (
        <div className="mb-4 p-4 rounded-xl bg-[#ffdad6] border border-[#ba1a1a]/20">
          <div className="flex items-start gap-3">
            <Lock size={20} className="text-[#ba1a1a] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#ba1a1a]">{lockoutInfo.message || t('auth.accountLockedMessage')}</p>
              <p className="text-xs text-[#8c1d18] mt-1">{t('auth.contactAdminUnlock')}</p>
              <button
                type="button"
                onClick={switchAccount}
                className="mt-2 text-xs font-semibold text-[#006e1c] hover:text-[#4caf50] underline transition-colors"
              >
                {t('auth.signInAnother')}
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">{t('auth.username')}</label>
          <input
            {...register('username')}
            type="text"
            placeholder={t('auth.enterUsername')}
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.username && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-[#3f4a3c] uppercase tracking-wider mb-1 block">{t('auth.password')}</label>
          <input
            {...register('password')}
            type="password"
            placeholder={t('auth.enterPassword')}
            className="w-full px-4 py-3 rounded-xl border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all"
          />
          {errors.password && (
            <p className="text-xs text-[#ba1a1a] mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-xs font-semibold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            {t('auth.forgotPassword')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading || lockoutInfo}
          className="w-full flex items-center justify-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn size={18} />
          {loading ? t('auth.signingIn') : lockoutInfo ? t('auth.accountLocked') : t('auth.signIn')}
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-[#6f7a6b]">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-bold text-[#006e1c] hover:text-[#4caf50] transition-colors">
            {t('auth.signUp')}
          </Link>
        </p>
        <button
          type="button"
          onClick={switchAccount}
          className="text-xs text-[#6f7a6b] hover:text-[#4caf50] transition-colors underline"
        >
          {t('auth.useAnotherAccount')}
        </button>
      </div>
    </div>
  );
}
