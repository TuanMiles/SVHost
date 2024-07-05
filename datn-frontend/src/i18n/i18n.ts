import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_PRODUCT_EN from '../locales/en/home.json'
import HOME_PRODUCT_VI from '../locales/vi/home.json'
import PRODUCT_EN from '../locales/en/header.json'
import PRODUCT_VI from '../locales/vi/header.json'
import LanguageDetector from 'i18next-browser-languagedetector'
import Cookies from 'js-cookie'
export const locals = {
  en: 'English',
  vi: 'Tiếng Việt'
}
const resources = {
  en: {
    home: HOME_PRODUCT_EN,
    header: PRODUCT_EN
  },
  vi: {
    home: HOME_PRODUCT_VI,
    header: PRODUCT_VI
  }
}
export const defaultNS = 'home'
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: Cookies.get('language'),
    ns: ['home', 'header'],
    fallbackLng: 'vi',
    // Cookies.get('language');
    detection: {
      order: ['cookie', 'querystring', 'localStorage'],
      caches: ['cookie'] // chon cookie là language chinh
    },
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
