import {createContext, useContext, useState, useEffect, useRef} from 'react'
import axios from 'axios'
import humps from 'humps'
import {toast} from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`
const GET_ENUMS_URL = `${CORE_URL}/getenums/`

const getEnums = () => {
  return axios.post(`${GET_ENUMS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

const EnumsContext = createContext({
  enums: undefined,
})

const EnumsProvider = ({children}) => {
  const didRequest = useRef(false)
  const [enums, setEnums] = useState(undefined)

  useEffect(() => {
    const requestEnums = async () => {
      try {
        if (!didRequest.current) {
          const data = await getEnums()
          if (data) {
            setEnums(data)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          toast.error('Unable to fetch Enumerations')
        }
      }

      return () => (didRequest.current = true)
    }

    requestEnums()
  }, [])

  return <EnumsContext.Provider value={{enums}}>{children}</EnumsContext.Provider>
}

const useEnums = () => useContext(EnumsContext)

export {EnumsProvider, useEnums}
