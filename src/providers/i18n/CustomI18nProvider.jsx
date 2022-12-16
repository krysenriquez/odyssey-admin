import React, {createContext, useContext} from 'react'

const I18N_CONFIG_KEY = import.meta.env.VITE_I18N_CONFIG_KEY || 'i18nConfig'

const initialState = {
  selectedLang: 'en',
}

function getConfig() {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls)
    } catch (er) {
      console.error(er)
    }
  }
  return initialState
}

export function setLanguage(lang) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: lang}))
  window.location.reload()
}

const I18nContext = createContext(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang
}

const CustomI18nProvider = ({children}) => {
  const lang = getConfig()
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
}

export {CustomI18nProvider, useLang}
