/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getCashout, GET_CASHOUT_INFO_URL} from '../api'

const CashoutInfoQueryContext = createContext(initialQuery)

const CashoutInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_CASHOUT_INFO_URL}-${searchParams.activityNumber}`,
    () => {
      return getCashout({activityNumber: searchParams.activityNumber})
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <CashoutInfoQueryContext.Provider value={value}>{children}</CashoutInfoQueryContext.Provider>
  )
}

const useCashoutInfoQueryContext = () => {
  return useContext(CashoutInfoQueryContext)
}

const useCashoutInfoQueryData = () => {
  const {response} = useCashoutInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useCashoutInfoQueryLoading = () => {
  const {isLoading} = useCashoutInfoQueryContext()
  return isLoading
}

export {
  CashoutInfoQueryProvider,
  useCashoutInfoQueryContext,
  useCashoutInfoQueryData,
  useCashoutInfoQueryLoading,
}
