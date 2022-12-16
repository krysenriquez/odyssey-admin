/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {Topbar} from './Topbar'
import {DefaultTitle} from './page-title/DefaultTitle'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header} = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      {/* begin::Container */}
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        <div className='d-flex align-items-center d-lg-none ms-n1 me-2' title='Show aside menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_aside_mobile_toggle'
          >
            <CustomSVG path='/public/media/icons/hamburger.svg' className='svg-icon-1' />
          </div>
        </div>
        {/* end::Aside mobile toggle */}

        {/* begin::Mobile logo */}
        <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
          <Link to='/dashboard' className='d-lg-none'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/public/media/logos/demo6.svg')}
              className='h-30px'
            />
          </Link>
        </div>
        {/* end::Mobile logo */}

        {/* begin::Topbar */}
        <div className={'d-flex align-items-stretch justify-content-end flex-lg-grow-1'}>
          <Topbar />
        </div>
      </div>
      {/* end::Container */}
    </div>
  )
}
