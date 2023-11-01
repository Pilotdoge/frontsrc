import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import enTrans from './locales/en.json'
i18next
  // .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({

    // backend: {
    //   loadPath: `./locales/{{lng}}.json`
    // },
    react: {
      useSuspense: true
    },
    resources: {
      en:{
        translation:enTrans
      } ,
     
    },
    debug: true,
    fallbackLng: ['en'],
    preload: ['en'],
    // keySeparator: false,
    interpolation: { escapeValue: false }
  })

export default i18next
