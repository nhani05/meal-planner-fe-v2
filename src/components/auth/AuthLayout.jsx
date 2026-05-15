import { Outlet } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f5fbef] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center shadow-lg shadow-[#4caf50]/20">
            <Leaf size={20} className="text-white" />
          </div>
          <div>
            <span className="font-black text-[#171d16] text-xl tracking-tighter">
              Nutri<span className="text-[#006e1c]">Plan</span>
            </span>
            <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-widest leading-none mt-0.5">{t('brand.tagline')}</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
