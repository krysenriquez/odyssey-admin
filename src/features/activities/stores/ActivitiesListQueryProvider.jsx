/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getActivity, GET_ACTIVITY_URL} from '../api'
import humps from 'humps'

const ActivitiesListQueryContext = createContext(initialQuery)

const ActivitiesListQueryProvider = ({children}) => {
  const searchParams = useParams()
  const activityType = humps
    .decamelize(humps.camelize(searchParams.activityType), {separator: '_'})
    .toUpperCase()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ACTIVITY_URL}-${activityType}`,
    () => {
      return getActivity({activityType: activityType})
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <ActivitiesListQueryContext.Provider value={value}>
      {children}
    </ActivitiesListQueryContext.Provider>
  )
}

const useActivitiesListQueryContext = () => useContext(ActivitiesListQueryContext)

const useActivitiesListQueryData = () => {
  const {response} = useActivitiesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useActivitiesListQueryLoading = () => {
  const {isLoading} = useActivitiesListQueryContext()
  return isLoading
}

export {
  ActivitiesListQueryProvider,
  useActivitiesListQueryContext,
  useActivitiesListQueryData,
  useActivitiesListQueryLoading,
}
