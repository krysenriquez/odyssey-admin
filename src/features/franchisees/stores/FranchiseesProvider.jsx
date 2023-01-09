import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getAllMembersFranchiseesSummariesCount} from '../api'

const FranchiseesContext = createContext({
  summaries: undefined,
  setSummaries: (any) => {},
})

const useFranchisees = () => {
  return useContext(FranchiseesContext)
}

const FranchiseesProvider = ({children}) => {
  const didRequestSummaries = useRef(false)
  const [summaries, setSummaries] = useState(undefined)

  useEffect(() => {
    const requestTopEarners = async () => {
      try {
        if (!didRequestSummaries.current) {
          const data = await getAllMembersFranchiseesSummariesCount()
          if (data.length > 0) {
            setSummaries(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaries.current) {
          toast.error('Unable to fetch Top Earners Information')
        }
      }

      return () => (didRequestSummaries.current = true)
    }

    requestTopEarners()
  }, [])

  return (
    <FranchiseesContext.Provider
      value={{
        summaries,
        setSummaries,
      }}
    >
      {children}
    </FranchiseesContext.Provider>
  )
}

export {FranchiseesProvider, useFranchisees}
