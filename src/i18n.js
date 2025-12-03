import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './content/en/common.json';
import cnCommon from './content/cn/common.json';
import jpCommon from './content/jp/common.json';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enCommon },
            cn: { translation: cnCommon },
            jp: { translation: jpCommon }
        },
        lng: savedLanguage, // Use saved language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

// Save language preference whenever it changes
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n;
