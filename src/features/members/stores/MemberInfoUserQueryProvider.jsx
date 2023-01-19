/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserMemberInfo, GET_MEMBER_USER_INFO_URL} from '../api'

const MemberInfoUserQueryContext = createContext(initialQuery)

const MemberInfoUserQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_MEMBER_USER_INFO_URL}-${searchParams.accountId}`,
    () => {
      return getUserMemberInfo(searchParams.accountId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <MemberInfoUserQueryContext.Provider value={value}>
      {children}
    </MemberInfoUserQueryContext.Provider>
  )
}

const useMemberInfoUserQueryContext = () => {
  return useContext(MemberInfoUserQueryContext)
}

const useMemberInfoUserQueryData = () => {
  const {response} = useMemberInfoUserQueryContext()
  if (!response) {
    return {}
  }

  return response || {}
}

const useMemberInfoUserQueryLoading = () => {
  const {isLoading} = useMemberInfoUserQueryContext()
  return isLoading
}

export {
  MemberInfoUserQueryProvider,
  useMemberInfoUserQueryContext,
  useMemberInfoUserQueryData,
  useMemberInfoUserQueryLoading,
}
