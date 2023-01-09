import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {useAuth} from './AuthProvider'
import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const USERS_URL = `${API_URL}/users`
const GET_PERMISSIONS_URL = `${USERS_URL}/getpermissions/`

const getPermissions = () => {
  return axios.post(`${GET_PERMISSIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

const PermissionsContext = createContext({
  permissions: undefined,
})

const PermissionsProvider = ({children}) => {
  const didRequest = useRef(false)
  const {logout, auth} = useAuth()
  const [permissions, setPermissions] = useState(undefined)

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (!didRequest.current) {
          const data = await getPermissions()
          if (data) {
            setPermissions(data.permissions)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      }

      return () => (didRequest.current = true)
    }

    requestPermissions()
  }, [auth])

  return <PermissionsContext.Provider value={{permissions}}>{children}</PermissionsContext.Provider>
}

const usePermissions = () => useContext(PermissionsContext)

export {PermissionsProvider, usePermissions}
