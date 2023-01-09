/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getCodes, GET_CODES_URL} from '../api'

const CodesListQueryContext = createContext(initialQuery)

const CodesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_CODES_URL}`,
    () => {
      return getCodes()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <CodesListQueryContext.Provider value={value}>{children}</CodesListQueryContext.Provider>
}

const useCodesListQueryContext = () => useContext(CodesListQueryContext)

const useCodesListQueryData = () => {
  const {response} = useCodesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useCodesListQueryLoading = () => {
  const {isLoading} = useCodesListQueryContext()
  return isLoading
}

export {
  CodesListQueryProvider,
  useCodesListQueryContext,
  useCodesListQueryData,
  useCodesListQueryLoading,
}
