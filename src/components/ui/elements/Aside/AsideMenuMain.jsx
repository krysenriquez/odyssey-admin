/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSubMain} from './AsideMenuItemWithSubMain'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        title={intl.formatMessage({id: 'DASHBOARD'})}
        fontIcon='bi-house fs-2'
        bsTitle={intl.formatMessage({id: 'DASHBOARD'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/members'
        title={intl.formatMessage({id: 'MEMBERS'})}
        fontIcon='bi-person-fill fs-2'
        bsTitle={intl.formatMessage({id: 'MEMBERS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/cashouts'
        title={intl.formatMessage({id: 'CASHOUTS'})}
        fontIcon='bi-cash-coin fs-2'
        bsTitle={intl.formatMessage({id: 'CASHOUTS'})}
        className='py-2'
      />
      <AsideMenuItemWithSubMain
        to='/ways-to-earn'
        title={intl.formatMessage({id: 'EARN'})}
        bsTitle={intl.formatMessage({id: 'EARN'})}
        fontIcon='bi-gear'
        icon=''
        hasBullet={false}
      >
        <AsideMenuItem
          to='/ways-to-earn/referrals'
          title={intl.formatMessage({id: 'REFERRALS'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'REFERRALS'})}
        />
        <AsideMenuItem
          to='/ways-to-earn/sales-matches'
          title={intl.formatMessage({id: 'SALESMATCH'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'SALESMATCH'})}
        />
        <AsideMenuItem
          to='/ways-to-earn/leadership-bonus'
          title={intl.formatMessage({id: 'LEADERSHIP'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'LEADERSHIP'})}
        />
        <AsideMenuItem
          to='/ways-to-earn/global-pool-bonus'
          title={intl.formatMessage({id: 'GLOBALPOOL'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'GLOBALPOOL'})}
        />
        <AsideMenuItem
          to='/ways-to-earn/flushouts'
          title={intl.formatMessage({id: 'FLUSHOUTS'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'FLUSHOUTS'})}
        />
      </AsideMenuItemWithSubMain>
      <AsideMenuItem
        to='/packages'
        title={intl.formatMessage({id: 'PACKAGES'})}
        fontIcon='bi-gift fs-2'
        bsTitle={intl.formatMessage({id: 'PACKAGES'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/codes'
        title={intl.formatMessage({id: 'CODES'})}
        fontIcon='bi-upc fs-2'
        bsTitle={intl.formatMessage({id: 'CODES'})}
        className='py-2'
      />
      {/* <AsideMenuItem
        to='/products'
        title={intl.formatMessage({id: 'PRODUCTS'})}
        fontIcon='bi-cart2 fs-2'
        bsTitle={intl.formatMessage({id: 'PRODUCTS'})}
        className='py-2'
      /> */}
      <AsideMenuItem
        to='/settings'
        title={intl.formatMessage({id: 'SETTINGS'})}
        fontIcon='bi-gear fs-2'
        bsTitle={intl.formatMessage({id: 'SETTINGS'})}
        className='py-2'
      />
    </>
  )
}
