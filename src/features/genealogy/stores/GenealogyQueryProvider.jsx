/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getGenealogy, GET_GENEALOGY_URL} from '../api'
import {useMemberInfoQueryData} from '@/features/members/stores/MemberInfoQueryProvider'
const GenealogyQueryContext = createContext(initialQuery)

const GenealogyQueryProvider = ({children}) => {
  const member = useMemberInfoQueryData()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_GENEALOGY_URL}-${member.accountId}`,
    () => {
      return getGenealogy(member.accountId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <GenealogyQueryContext.Provider value={value}>{children}</GenealogyQueryContext.Provider>
}

const useGenealogyQueryContext = () => useContext(GenealogyQueryContext)

const useGenealogyQueryData = () => {
  const {response} = useGenealogyQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useGenealogyQueryLoading = () => {
  const {isLoading} = useGenealogyQueryContext()
  return isLoading
}

export {
  GenealogyQueryProvider,
  useGenealogyQueryContext,
  useGenealogyQueryData,
  useGenealogyQueryLoading,
}
