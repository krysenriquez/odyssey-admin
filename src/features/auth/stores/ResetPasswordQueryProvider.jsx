/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {verifyResetPassword, REQUEST_RESET_PASSWORD_URL} from '../api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ResetPasswordQueryContext = createContext({
  token: undefined,
  verified: false,
})

const ResetPasswordQueryProvider = ({children}) => {
  const swal = withReactContent(Swal)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const didRequest = useRef(false)
  const urlData = searchParams.get('data')
  const [token, setToken] = useState(undefined)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const validateResetPasswordLink = async () => {
      try {
        if (!didRequest.current) {
          const data = await verifyResetPassword({data: urlData})
          if (data) {
            swal.fire('Link Verified!', 'Please reset your password.', 'success').then((result) => {
              setToken(data)
              setVerified(true)
            })
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          swal.fire('Invalid Link!', error.response.data.message, 'error').then((result) => {
            setVerified(false)
            navigate('/')
          })
        }
      }

      return () => (didRequest.current = true)
    }

    if (urlData) {
      validateResetPasswordLink()
    }
  }, [urlData])

  const value = {
    token,
    verified,
  }
  return (
    <ResetPasswordQueryContext.Provider value={value}>
      {children}
    </ResetPasswordQueryContext.Provider>
  )
}

const useResetPasswordQueryContext = () => {
  return useContext(ResetPasswordQueryContext)
}

export {ResetPasswordQueryProvider, useResetPasswordQueryContext}
