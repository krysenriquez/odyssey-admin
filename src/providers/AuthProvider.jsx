import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {LayoutSplashScreen} from './SplashScreen'
import * as authUtils from '@/features/auth/utils/AuthUtils'
import {getUserByToken, refreshToken} from '@/features/auth/api'

const AuthContext = createContext({
  auth: authUtils.getAuth(),
  saveAuth: (any) => {},
  currentUser: undefined,
  setCurrentUser: (any) => {},
  logout: () => {},
})

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(authUtils.getAuth())
  const [currentUser, setCurrentUser] = useState(undefined)

  const saveAuth = (auth) => {
    setAuth(auth)
    if (auth) {
      authUtils.setAuth(auth)
    } else {
      authUtils.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth && auth.refresh) {
        const {data} = await refreshToken(auth.refresh)
        if (data) {
          console.log('Auth Refreshed')
          saveAuth(data)
        }
      }
    }, authUtils.AUTH_LOCAL_STORAGE_KEY_DURATION)
    return () => clearInterval(interval)
  }, [auth])

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const requestUser = async (apiToken) => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.access) {
      requestUser(auth.access)
    } else {
      logout()
      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
