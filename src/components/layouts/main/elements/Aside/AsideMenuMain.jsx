/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {usePermissions} from '@/providers/PermissionsProviders'
import RolePermissionComponent from '@/utils/RolePermissionComponent'
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
      <RolePermissionComponent permissionName='Member Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/members'
          title={intl.formatMessage({id: 'MEMBERS'})}
          fontIcon='bi-person-fill fs-2'
          bsTitle={intl.formatMessage({id: 'MEMBERS'})}
          className='py-2'
        />
      </RolePermissionComponent>
      <RolePermissionComponent permissionName='Franchisee Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/franchisees'
          title={intl.formatMessage({id: 'FRANCHISEES'})}
          fontIcon='bi-cart-check fs-2'
          bsTitle={intl.formatMessage({id: 'FRANCHISEES'})}
          className='py-2'
        />
      </RolePermissionComponent>
      <RolePermissionComponent permissionName='Cashout Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/cashouts'
          title={intl.formatMessage({id: 'CASHOUTS'})}
          fontIcon='bi-cash-coin fs-2'
          bsTitle={intl.formatMessage({id: 'CASHOUTS'})}
          className='py-2'
        />
      </RolePermissionComponent>
      <RolePermissionComponent permissionName='Activity Management' permission='canRetrieve'>
        <AsideMenuItemWithSubMain
          to='/activities'
          title={intl.formatMessage({id: 'ACTIVITIES'})}
          bsTitle={intl.formatMessage({id: 'ACTIVITIES'})}
          fontIcon='bi-activity'
          icon=''
          hasBullet={false}
        >
          <AsideMenuItem
            to='/activities/direct-referral'
            title={intl.formatMessage({id: 'REFERRALS'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'REFERRALS'})}
          />
          <AsideMenuItem
            to='/activities/referral-bonus'
            title={intl.formatMessage({id: 'REFERRAL_BONUS'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'REFERRAL_BONUS'})}
          />
          <AsideMenuItem
            to='/activities/sales-match'
            title={intl.formatMessage({id: 'SALESMATCH'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'SALESMATCH'})}
          />
          <AsideMenuItem
            to='/activities/leadership-bonus'
            title={intl.formatMessage({id: 'LEADERSHIP'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'LEADERSHIP'})}
          />
          <AsideMenuItem
            to='/activities/global-pool-bonus'
            title={intl.formatMessage({id: 'GLOBALPOOL'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'GLOBALPOOL'})}
          />
          <AsideMenuItem
            to='/activities/franchise-commission'
            title={intl.formatMessage({id: 'FRANCHISE_COMMISSION'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'FRANCHISE_COMMISSION'})}
          />
          <AsideMenuItem
            to='/activities/flush-out-penalty'
            title={intl.formatMessage({id: 'FLUSHOUTS'})}
            hasBullet={true}
            bsTitle={intl.formatMessage({id: 'FLUSHOUTS'})}
          />
        </AsideMenuItemWithSubMain>
      </RolePermissionComponent>
      <RolePermissionComponent permissionName='Package Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/packages'
          title={intl.formatMessage({id: 'PACKAGES'})}
          fontIcon='bi-gift fs-2'
          bsTitle={intl.formatMessage({id: 'PACKAGES'})}
          className='py-2'
        />
      </RolePermissionComponent>
      <RolePermissionComponent permissionName='Code Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/codes'
          title={intl.formatMessage({id: 'CODES'})}
          fontIcon='bi-upc fs-2'
          bsTitle={intl.formatMessage({id: 'CODES'})}
          className='py-2'
        />
      </RolePermissionComponent>
      {/* <AsideMenuItem
        to='/products'
        title={intl.formatMessage({id: 'PRODUCTS'})}
        fontIcon='bi-cart2 fs-2'
        bsTitle={intl.formatMessage({id: 'PRODUCTS'})}
        className='py-2'
      /> */}
      <RolePermissionComponent permissionName='Settings Management' permission='canRetrieve'>
        <AsideMenuItem
          to='/settings'
          title={intl.formatMessage({id: 'SETTINGS'})}
          fontIcon='bi-gear fs-2'
          bsTitle={intl.formatMessage({id: 'SETTINGS'})}
          className='py-2'
        />
      </RolePermissionComponent>
    </>
  )
}
