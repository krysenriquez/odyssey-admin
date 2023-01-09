import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getSettings} from '../api'

const SettingsContext = createContext({
  settings: undefined,
})

const useSettings = () => {
  return useContext(SettingsContext)
}

const SettingsProvider = ({children}) => {
  const didRequestSettings = useRef(false)
  const [settings, setSettings] = useState(undefined)

  useEffect(() => {
    const requestSettings = async () => {
      try {
        if (!didRequestSettings.current) {
          const data = await getSettings()
          if (data.length > 0) {
            setSettings(data)
          }
        }
      } catch (error) {
        if (!didRequestSettings.current) {
          toast.error('Unable to fetch Settings')
        }
      }

      return () => (didRequestSettings.current = true)
    }

    requestSettings()
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export {SettingsProvider, useSettings}
