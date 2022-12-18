import {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import humps from 'humps'
import * as authUtils from '@/features/auth/utils/AuthUtils'
import {toast} from 'react-toastify'
import {useQuery} from 'react-query'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`
const GET_ENUMS_URL = `${CORE_URL}/getenums/`

const getEnums = () => {
  return axios.post(`${GET_ENUMS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

const EnumsListQueryContext = createContext({
  refetch: () => {},
  isLoading: false,
  response: {},
})

const EnumsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ENUMS_URL}`,
    () => {
      return getEnums()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <EnumsListQueryContext.Provider value={value}>{children}</EnumsListQueryContext.Provider>
}

const useEnumsListQueryContext = () => useContext(EnumsListQueryContext)

const getEnum = () => {
  const {response} = useEnumsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

export {EnumsListQueryProvider, useEnumsListQueryContext, getEnum}
