/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect, useMemo} from 'react'
import qs from 'qs'
import {useQuery} from 'react-query'
import {QUERIES} from '@/_metronic/helpers'
import {getUsers} from './_requests'
import {useQueryRequest} from './QueryRequestProvider'

export const initialQueryResponse = {
  refetch: () => {},
  isLoading: false,
  query: '',
}

export const initialQueryState = {
  page: 1,
  items_per_page: 10,
}

function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && obj !== ''
}

function stringifyRequestQuery(state) {
  const pagination = qs.stringify(state, {
    filter: ['page', 'items_per_page'],
    skipNulls: true,
  })
  const sort = qs.stringify(state, {
    filter: ['sort', 'order'],
    skipNulls: true,
  })
  const search = isNotEmpty(state.search)
    ? qs.stringify(state, {filter: ['search'], skipNulls: true})
    : ''

  const filter = state.filter
    ? Object.entries(state.filter)
        .filter((obj) => isNotEmpty(obj[1]))
        .map((obj) => {
          return `filter_${obj[0]}=${obj[1]}`
        })
        .join('&')
    : ''

  return [pagination, sort, search, filter]
    .filter((f) => f)
    .join('&')
    .toLowerCase()
}

const QueryResponseContext = createContext(initialQueryResponse)

const QueryResponseProvider = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getUsers(query)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
}

const useQueryResponseLoading = () => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
