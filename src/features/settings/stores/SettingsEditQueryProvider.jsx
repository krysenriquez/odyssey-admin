/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSetting, GET_SETTINGS_URL} from '../api'
import {useSettingsListQueryContext} from './SettingsListQueryProvider'

const SettingsEditQueryContext = createContext(initialQuery)

const SettingsEditQueryProvider = ({children}) => {
  const {settingsId} = useSettingsListQueryContext()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_SETTINGS_URL}-${settingsId}`,
    () => {
      return getSetting({id: settingsId})
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <SettingsEditQueryContext.Provider value={value}>{children}</SettingsEditQueryContext.Provider>
  )
}

const useSettingsEditQueryContext = () => {
  return useContext(SettingsEditQueryContext)
}

const useSettingsEditQueryData = () => {
  const {response} = useSettingsEditQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSettingsEditQueryLoading = () => {
  const {isLoading} = useSettingsEditQueryContext()
  return isLoading
}

export {
  SettingsEditQueryProvider,
  useSettingsEditQueryContext,
  useSettingsEditQueryData,
  useSettingsEditQueryLoading,
}
