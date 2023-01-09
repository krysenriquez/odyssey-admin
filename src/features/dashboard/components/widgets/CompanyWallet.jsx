import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {getAllWalletSummaryList} from '@/features/wallets/api'
import {toCurrency} from '@/utils/toCurrency'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {WalletSummary} from '@/features/wallets/components/WalletSummary/WalletSummary'

const WalletSummaryModal = (prop) => {
  const intl = useIntl()
  const {isModalOpen, toggleModal, walletName} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: intl.formatMessage({id: walletName}) + ' Summary',
  }

  return (
    <CustomModal {...value}>
      <WalletSummary />
    </CustomModal>
  )
}

export const CompanyWallet = () => {
  const intl = useIntl()
  const {adminWallets, setWalletSummary} = useWallet()
  const [walletName, setWalletName] = useState(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getWalletSummary = async (wallet) => {
    await getAllWalletSummaryList({wallet: wallet}).then((response) => {
      setWalletName(wallet)
      setWalletSummary(response)
      toggleModal()
    })
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='row g-5 g-xl-10'>
      {adminWallets ? (
        adminWallets.map((wallet) => {
          return (
            <div className='col-12 widget-wallet' key={wallet.wallet}>
              <div
                className={clsx(
                  'card card-flush h-xl-100 cursor-pointer hover-elevate-up shadow-sm parent-hover widget-content',
                  {
                    f_wallet: wallet.wallet == 'F_WALLET',
                    b_wallet: wallet.wallet == 'B_WALLET',
                  }
                )}
                onClick={() => {
                  getWalletSummary(wallet.wallet)
                }}
              >
                <div className='card-body'>
                  <span className='card-title fw-bold text-white fs-7 mb-3 d-block'>
                    {intl.formatMessage({id: wallet.wallet})}
                  </span>
                  <div className='d-flex align-items-center'>
                    <span className='fs-3hx text-white fw-bold me-6'>
                      {toCurrency(wallet.total)}
                    </span>
                    <div className='fw-bold fs-6 text-white'>
                      <span className='d-block'>Total Balance</span>
                    </div>
                  </div>
                  <div className='d-flex align-items-center '>
                    <span className='fs-2 text-danger fw-bold me-6'>
                      {toCurrency(wallet.payout)}
                    </span>
                    <div className='fw-bold fs-6 text-danger'>
                      <span className='d-block'>Total Payout</span>
                    </div>
                  </div>
                </div>
                <div
                  className='card-footer'
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className='fw-bold text-white'>
                    <span className='fs-1 d-block'>{toCurrency(wallet.runningTotal)}</span>
                    <span className='opacity-50'>Total Accumulated</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <></>
      )}
      {isModalOpen && (
        <WalletSummaryModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          walletName={walletName}
        />
      )}
    </div>
  )
}
