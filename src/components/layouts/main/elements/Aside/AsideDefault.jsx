import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {AsideMenu} from './AsideMenu'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const AsideDefault = () => {
  const {classes} = useLayout()
  return (
    <div
      id='kt_aside'
      className={clsx('aside pb-5 pt-5 pt-lg-0 ', classes.aside.join(' '))}
      data-drawer='true'
      data-drawer-name='aside'
      data-drawer-activate='{default: true, lg: false}'
      data-drawer-overlay='true'
      data-drawer-width="{default:'80px', '300px': '100px'}"
      data-drawer-direction='start'
      data-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo  py-8' id='kt_aside_logo'>
        <Link to='/dashboard' className='d-flex align-items-center'>
          <img src={toAbsoluteUrl('/media/logos/tci.png')} alt='logo' className='h-100px logo' />
        </Link>
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid' id='kt_aside_menu'>
        {/* begin::Nav */}
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
        {/* end::Nav */}

        {/* end::Aside menu */}
      </div>
    </div>
  )
}

export {AsideDefault}
