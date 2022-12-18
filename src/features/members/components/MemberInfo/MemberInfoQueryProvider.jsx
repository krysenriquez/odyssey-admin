/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserMember, GET_MEMBER_INFO_URL} from '../../api'
const MemberInfoQueryContext = createContext(initialQuery)
const MemberInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_MEMBER_INFO_URL}-${searchParams.account_id}`,
    () => {
      return getUserMember(searchParams.account_id)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <MemberInfoQueryContext.Provider value={value}>{children}</MemberInfoQueryContext.Provider>
}

const useMemberInfoQueryContext = () => {
  return useContext(MemberInfoQueryContext)
}

const useMemberInfoQueryData = () => {
  const {response} = useMemberInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useMemberInfoQueryLoading = () => {
  const {isLoading} = useMemberInfoQueryContext()
  return isLoading
}

export {
  MemberInfoQueryProvider,
  useMemberInfoQueryContext,
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
}
