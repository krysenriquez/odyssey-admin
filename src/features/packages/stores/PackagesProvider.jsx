import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getPackages} from '../api'

const PackagesContext = createContext({
  packagePlans: undefined,
})

const usePackages = () => {
  return useContext(PackagesContext)
}

const PackagesProvider = ({children}) => {
  const didRequestPackagePlans = useRef(false)
  const [packagePlans, setPackagePlans] = useState(undefined)

  useEffect(() => {
    const requestPackagePlans = async () => {
      try {
        if (!didRequestPackagePlans.current) {
          const data = await getPackages()
          if (data.length > 0) {
            setPackagePlans(data)
          }
        }
      } catch (error) {
        if (!didRequestPackagePlans.current) {
          toast.error('Unable to fetch Packages')
        }
      }

      return () => (didRequestPackagePlans.current = true)
    }

    requestPackagePlans()
  }, [])

  return (
    <PackagesContext.Provider
      value={{
        packagePlans,
      }}
    >
      {children}
    </PackagesContext.Provider>
  )
}

export {PackagesProvider, usePackages}
