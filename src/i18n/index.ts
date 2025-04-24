
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en';
import pt from './locales/pt';

// Safely check for localStorage in browser environment
const getStoredLanguage = () => {
  try {
    return localStorage.getItem('language');
  } catch (e) {
    return null;
  }
};

// Get browser language if available or default to en-US
const getBrowserLanguage = () => {
  try {
    return navigator.language.substring(0, 2);
  } catch (e) {
    return 'en';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      pt: {
        translation: pt
      },
    },
    lng: getStoredLanguage() || getBrowserLanguage() || 'en',
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    debug: false,
  });

export default i18n;
