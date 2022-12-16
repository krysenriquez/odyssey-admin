import {useState, createContext, useContext} from 'react'

export const initialQueryState = {
  page: 1,
  items_per_page: 10,
}

export const initialQueryRequest = {
  state: initialQueryState,
  updateState: () => {},
}

const QueryRequestContext = createContext(initialQueryRequest)

const QueryRequestProvider = ({children}) => {
  const [state, setState] = useState(initialQueryRequest.state)

  const updateState = (updates) => {
    const updatedState = {
      ...state,
      ...updates,
    }
    setState(updatedState)
  }

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
