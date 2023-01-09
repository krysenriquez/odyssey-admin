import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getTopEarners} from '../api'

const MembersContext = createContext({
  topEarners: undefined,
  setTopEarners: (any) => {},
})

const useMembers = () => {
  return useContext(MembersContext)
}

const MembersProvider = ({children}) => {
  const didRequestTopEarners = useRef(false)
  const [topEarners, setTopEarners] = useState(undefined)

  useEffect(() => {
    const requestTopEarners = async () => {
      try {
        if (!didRequestTopEarners.current) {
          const data = await getTopEarners()
          if (data.length > 0) {
            setTopEarners(data)
          }
        }
      } catch (error) {
        if (!didRequestTopEarners.current) {
          toast.error('Unable to fetch Top Earners Information')
        }
      }

      return () => (didRequestTopEarners.current = true)
    }

    requestTopEarners()
  }, [])

  return (
    <MembersContext.Provider
      value={{
        topEarners,
        setTopEarners,
      }}
    >
      {children}
    </MembersContext.Provider>
  )
}

export {MembersProvider, useMembers}
