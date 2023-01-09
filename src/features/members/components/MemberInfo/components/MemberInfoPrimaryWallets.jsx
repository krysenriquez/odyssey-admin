import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useWallet} from '../../../../wallets/stores/WalletProvider'
import {getAllWalletSummaryList} from '@/features/wallets/api'
import {toCurrency} from '@/utils/toCurrency'
import {useMemberInfoQueryData} from '@/features/members/stores/MemberInfoQueryProvider'

export const MemberInfoPrimaryWallets = () => {
  const intl = useIntl()
  const member = useMemberInfoQueryData()
  const {memberWallets, setWalletSummary} = useWallet()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const getWalletSummary = async (wallet) => {
    await getAllWalletSummaryList({accountId: member.accountId, wallet: wallet}).then(
      (response) => {
        setWalletSummary(response)
        toggleModal()
      }
    )
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {memberWallets ? (
        memberWallets.map((wallet) => {
          return (
            <div className='col' key={wallet.wallet}>
              <div className='card pt-4 h-md-100 mb-6 mb-md-0'>
                <div className='card-header border-0'>
                  <div className='card-title'>
                    <h2 className='fw-bold'>{intl.formatMessage({id: wallet.wallet})}</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <div className='fw-bold fs-2'>
                    <div className='d-flex'>
                      <div className='ms-2'>
                        {toCurrency(wallet.total)}
                        <span className='text-muted fs-4 ms-2 fw-semibold'>Total Balance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <></>
      )}
    </>
  )
}
