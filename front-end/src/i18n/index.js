import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import lt from './lt.json';
import en from './en.json';
import ru from './ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      lt: {
        translation: {
          ...lt.translation,
        },
      },
      en: {
        translation: {
          ...en.translation,
        },
      },
      ru: {
        translation: {
          ...ru.translation,
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.changeLanguage('lt');

export default i18n;