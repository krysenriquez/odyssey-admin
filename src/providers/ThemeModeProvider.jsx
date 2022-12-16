import React, {createContext, useContext, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const systemMode = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

const themeModeSwitchHelper = (_mode) => {
  const mode = _mode !== 'system' ? _mode : systemMode
  const imageUrl = '/public/media/patterns/header-bg' + (mode === 'light' ? '.jpg' : '-dark.png')
  document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`
}

const themeModeLSKey = 'kt_theme_mode_value'
const themeMenuModeLSKey = 'kt_theme_mode_menu'

const getThemeModeFromLocalStorage = (lsKey, isMenu) => {
  if (!localStorage) {
    return 'light'
  }

  const data = localStorage.getItem(lsKey)
  if (data === 'dark' || data === 'light') {
    return data
  }

  if (isMenu && data === 'system') {
    return data
  }

  if (document.documentElement.hasAttribute('data-theme')) {
    const dataTheme = document.documentElement.getAttribute('data-theme')
    if (dataTheme && (dataTheme === 'dark' || dataTheme === 'light')) {
      return dataTheme
    }
  }

  return 'system'
}

const defaultThemeMode = {
  mode: getThemeModeFromLocalStorage(themeModeLSKey),
  menuMode: getThemeModeFromLocalStorage(themeMenuModeLSKey, true),
  updateMode: (_mode) => {},
  updateMenuMode: (_menuMode) => {},
}

const ThemeModeContext = createContext({
  mode: defaultThemeMode.mode,
  menuMode: defaultThemeMode.menuMode,
  updateMode: (_mode) => {},
  updateMenuMode: (_menuMode) => {},
})

const useThemeMode = () => useContext(ThemeModeContext)

const ThemeModeProvider = ({children}) => {
  const [mode, setMode] = useState(defaultThemeMode.mode)
  const [menuMode, setMenuMode] = useState(defaultThemeMode.menuMode)

  const updateMode = (_mode, saveInLocalStorage = true) => {
    const updatedMode = _mode === 'system' ? systemMode : _mode
    setMode(updatedMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeModeLSKey, updatedMode)
    }

    if (saveInLocalStorage) {
      document.documentElement.setAttribute('data-theme', updatedMode)
    }
  }

  const updateMenuMode = (_menuMode, saveInLocalStorage = true) => {
    setMenuMode(_menuMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeMenuModeLSKey, _menuMode)
    }
  }

  useEffect(() => {
    updateMode(mode, false)
    updateMenuMode(menuMode, false)
  }, [])

  return (
    <ThemeModeContext.Provider value={{mode, menuMode, updateMode, updateMenuMode}}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export {ThemeModeProvider, useThemeMode, systemMode, themeModeSwitchHelper}
