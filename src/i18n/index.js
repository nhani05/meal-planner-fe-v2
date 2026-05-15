import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';

const LANGUAGE_KEY = 'nutriplan.language';
const supportedLngs = ['vi', 'en'];

const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
const initialLanguage = supportedLngs.includes(savedLanguage) ? savedLanguage : 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: initialLanguage,
    fallbackLng: 'vi',
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
  });

document.documentElement.lang = initialLanguage;

i18n.on('languageChanged', (lng) => {
  const nextLanguage = supportedLngs.includes(lng) ? lng : 'vi';
  localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  document.documentElement.lang = nextLanguage;
});

export default i18n;
