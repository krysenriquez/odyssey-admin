import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {
  getWalletSummary,
  getPointValuesMemberWalletSummary,
  getCompanyWalletSummary,
} from '@/features/wallets/api'
import {useMemberInfoQueryData} from '@/features/members/stores/MemberInfoQueryProvider'

const WalletContext = createContext({
  memberWallets: undefined,
  setMemberWallets: (any) => {},
  pvMemberWallets: undefined,
  setMemberPvWallets: (any) => {},
  adminWallets: undefined,
  setAdminWallets: (any) => {},
  walletSummary: undefined,
  setWalletSummary: (any) => {},
})

const useWallet = () => {
  return useContext(WalletContext)
}

const WalletProvider = ({children}) => {
  const member = useMemberInfoQueryData()
  const didRequestWallet = useRef(false)
  const didRequestPvWallet = useRef(false)
  const [memberWallets, setMemberWallets] = useState(undefined)
  const [pvMemberWallets, setMemberPvWallets] = useState(undefined)
  const [adminWallets, setAdminWallets] = useState(undefined)
  const [walletSummary, setWalletSummary] = useState(undefined)

  useEffect(() => {
    const requestWallet = async () => {
      try {
        if (!didRequestWallet.current) {
          const data = await getWalletSummary(member.accountId)
          if (data.length > 0) {
            setMemberWallets(data)
          }
        }
      } catch (error) {
        if (!didRequestWallet.current) {
          toast.error('Unable to fetch Wallet Information')
        }
      }

      return () => (didRequestWallet.current = true)
    }

    const requestPvWallet = async () => {
      try {
        if (!didRequestPvWallet.current) {
          const data = await getPointValuesMemberWalletSummary(member.accountId)
          if (data.length > 0) {
            setMemberPvWallets(data)
          }
        }
      } catch (error) {
        if (!didRequestPvWallet.current) {
          toast.error('Unable to fetch PV Wallet Information')
        }
      }

      return () => (didRequestPvWallet.current = true)
    }

    if (Object.keys(member).length > 0) {
      requestWallet()
      requestPvWallet()
    }
  }, [member])

  useEffect(() => {
    const requestCompanyWallet = async () => {
      try {
        if (!didRequestWallet.current) {
          const data = await getCompanyWalletSummary()
          if (data.length > 0) {
            setAdminWallets(data)
          }
        }
      } catch (error) {
        if (!didRequestWallet.current) {
          toast.error('Unable to fetch Wallet Information')
        }
      }

      return () => (didRequestWallet.current = true)
    }

    requestCompanyWallet()
  }, [])

  return (
    <WalletContext.Provider
      value={{
        memberWallets,
        setMemberWallets,
        pvMemberWallets,
        setMemberPvWallets,
        adminWallets,
        setAdminWallets,
        walletSummary,
        setWalletSummary,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export {WalletProvider, useWallet}
