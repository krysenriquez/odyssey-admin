import {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {toPointValue} from '@/utils/toCurrency'
import {getPointValuesMemberWalletSummary} from '@/features/wallets/api'
import {useMemberInfoQueryData} from '../../../stores/MemberInfoQueryProvider'
import {toast} from 'react-toastify'

export const MemberInfoPvWallets = () => {
  const intl = useIntl()
  const member = useMemberInfoQueryData()
  const [pvWallets, setPvWallets] = useState(undefined)

  useEffect(() => {
    getPointValuesMemberWalletSummary(member.accountId)
      .then((response) => {
        setPvWallets(response)
      })
      .catch((err) => {
        toast.error('Unable to fetch PV Wallets')
      })
  }, [member])

  return (
    <>
      {pvWallets ? (
        <>
          <div className='fw-bold mb-3'>Point Value Wallets</div>
          <div className='d-flex flex-wrap flex-center gap-3'>
            {pvWallets.map((pvWallet) => {
              return (
                <div
                  className='border border-gray-300 border-dashed rounded py-3 px-3 mb-3'
                  key={pvWallet.wallet}
                >
                  <div className='fs-4 fw-bold text-gray-700 text-center'>
                    <div className='fw-semibold text-muted'>
                      {intl.formatMessage({id: pvWallet.walletDisplay})}
                    </div>
                    <span className='w-75px'>{toPointValue(pvWallet.total)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>{pvWallets}</>
      )}
    </>
  )
}
