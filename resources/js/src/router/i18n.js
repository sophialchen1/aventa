import {createI18n} from "vue-i18n";
import es from '../locales/es.json';
import en from '../locales/en.json';

const savedLang = localStorage.getItem('lang');
const userLang = savedLang || (navigator.language.startsWith('es') ? 'es' : 'en');

export const i18n = createI18n({
    legacy: false,
    locale: userLang,
    fallbackLocale:'en',
    messages: {
        en,
        es
    }
});
