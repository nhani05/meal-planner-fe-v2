import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ compact = false, className = '' }) {
  const { i18n, t } = useTranslation();
  const isVi = i18n.resolvedLanguage !== 'en';
  const nextLanguage = isVi ? 'en' : 'vi';

  const handleChange = () => {
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      type="button"
      onClick={handleChange}
      aria-label={isVi ? t('language.switchToEnglish') : t('language.switchToVietnamese')}
      title={isVi ? t('language.switchToEnglish') : t('language.switchToVietnamese')}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#becab9]/60 bg-white p-1 text-xs font-black text-[#3f4a3c] shadow-sm transition-all hover:border-[#4caf50]/70 hover:shadow-md active:scale-95 ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5fbef] text-[#006e1c]">
        <Globe2 size={15} strokeWidth={2.4} />
      </span>
      <span className={`flex items-center rounded-full bg-[#f5fbef] p-0.5 ${compact ? '' : 'gap-0.5'}`}>
        <span
          className={`min-w-8 rounded-full px-2 py-1 text-center leading-none transition-colors ${
            !isVi ? 'bg-[#006e1c] text-white shadow-sm' : 'text-[#6f7a6b]'
          }`}
        >
          EN
        </span>
        <span
          className={`min-w-8 rounded-full px-2 py-1 text-center leading-none transition-colors ${
            isVi ? 'bg-[#006e1c] text-white shadow-sm' : 'text-[#6f7a6b]'
          }`}
        >
          VI
        </span>
      </span>
    </button>
  );
}
