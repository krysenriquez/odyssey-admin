/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getFranchisees, GET_FRANCHISEE_LIST_URL} from '../api'

const FranchiseesListQueryContext = createContext(initialQuery)

const FranchiseesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_FRANCHISEE_LIST_URL}`,
    () => {
      return getFranchisees()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <FranchiseesListQueryContext.Provider value={value}>
      {children}
    </FranchiseesListQueryContext.Provider>
  )
}

const useFranchiseesListQueryContext = () => useContext(FranchiseesListQueryContext)

const useFranchiseesListQueryData = () => {
  const {response} = useFranchiseesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useFranchiseesListQueryLoading = () => {
  const {isLoading} = useFranchiseesListQueryContext()
  return isLoading
}

export {
  FranchiseesListQueryProvider,
  useFranchiseesListQueryContext,
  useFranchiseesListQueryData,
  useFranchiseesListQueryLoading,
}
