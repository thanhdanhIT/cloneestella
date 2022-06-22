import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import EN_MESSAGE from "./locales/en/message"
import EN_TRANSLATE from "./locales/en/translate"
import VI_MESSAGE from "./locales/vi/message"
import VI_TRANSLATE from "./locales/vi/translate"

const resources = {
  en: { translation: EN_TRANSLATE, message: EN_MESSAGE },
  vi: { translation: VI_TRANSLATE, message: VI_MESSAGE }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigate"],
      lookupQuerystring: "lng",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      caches: ["localStorage", "cookie"]
    },
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
