/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getPackages, GET_PACKAGES_URL} from '../../api'

const PackagesListQueryContext = createContext(initialQuery)

const PackagesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PACKAGES_URL}`,
    () => {
      return getPackages()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <PackagesListQueryContext.Provider value={value}>{children}</PackagesListQueryContext.Provider>
  )
}

const usePackagesListQueryContext = () => useContext(PackagesListQueryContext)

const usePackagesListQueryData = () => {
  const {response} = usePackagesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePackagesListQueryLoading = () => {
  const {isLoading} = usePackagesListQueryContext()
  return isLoading
}

export {
  PackagesListQueryProvider,
  usePackagesListQueryContext,
  usePackagesListQueryData,
  usePackagesListQueryLoading,
}
