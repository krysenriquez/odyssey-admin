/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSettings, GET_SETTINGS_URL} from '../api'

const SettingsListQueryContext = createContext(initialQuery)

const SettingsListQueryProvider = ({children}) => {
  const [settingsId, setSettingsId] = useState(undefined)

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_SETTINGS_URL}`,
    () => {
      return getSettings()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
    settingsId,
    setSettingsId,
  }

  return (
    <SettingsListQueryContext.Provider value={value}>{children}</SettingsListQueryContext.Provider>
  )
}

const useSettingsListQueryContext = () => useContext(SettingsListQueryContext)

const useSettingsListQueryData = () => {
  const {response} = useSettingsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSettingsListQueryLoading = () => {
  const {isLoading} = useSettingsListQueryContext()
  return isLoading
}

export {
  SettingsListQueryProvider,
  useSettingsListQueryContext,
  useSettingsListQueryData,
  useSettingsListQueryLoading,
}
