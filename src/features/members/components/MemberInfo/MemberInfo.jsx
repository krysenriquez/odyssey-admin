/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {useEffect} from 'react'
import {
  getPointValuesMemberWalletSummary,
  getMemberWalletSummary,
  getActivityTotalSummary,
} from '../../api'
import {useIntl} from 'react-intl'
import {toCurrency} from '@/utils/toCurrency'

const MemberInfo = ({member}) => {
  const intl = useIntl()
  const location = useLocation()
  const [pvWallets, setPvWallets] = useState([])
  const [wallets, setWallets] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    console.log(member)
    getPointValuesMemberWalletSummary(member.account_id)
      .then((response) => {
        setPvWallets(response.data)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    getMemberWalletSummary(member.account_id)
      .then((response) => {
        setWallets(response.data)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    getActivityTotalSummary(member.account_id)
      .then((response) => {
        setActivities(response.data)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [member])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Top Choice' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {member.full_name}
                  </a>
                  <a href='#'>
                    <CustomSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                  <a
                    href='#'
                    className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                  >
                    Upgrade Account
                  </a>
                </div>
                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <CustomSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {member.account_status}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <CustomSVG
                      path='/media/icons/duotune/general/gen018.svg'
                      className='svg-icon-4 me-1'
                    />
                    {member.account_status}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <CustomSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {member.account_number}
                  </a>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {wallets.map((wallet) => {
                    return (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <CustomSVG
                            path='/media/icons/duotune/arrows/arr066.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          <div className='fs-2 fw-bolder'>{toCurrency(wallet.total)}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {' '}
                          {intl.formatMessage({id: wallet.wallet})}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {pvWallets.map((wallet) => {
                    return (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <CustomSVG
                            path='/media/icons/duotune/arrows/arr066.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          <div className='fs-2 fw-bolder'>{wallet.total} PV</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {' '}
                          {intl.formatMessage({id: wallet.wallet})}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {activities.map((activity) => {
                    return (
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <CustomSVG
                            path='/media/icons/duotune/arrows/arr066.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          <div className='fs-2 fw-bolder'>{toCurrency(activity.total)}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {' '}
                          {intl.formatMessage({id: activity.activity})}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/overview' && 'active')
                }
                to='/crafted/account/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/settings' && 'active')
                }
                to='/crafted/account/settings'
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {MemberInfo}
