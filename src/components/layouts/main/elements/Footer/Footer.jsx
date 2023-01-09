import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {useIntl} from 'react-intl'

const Footer = () => {
  const intl = useIntl()
  const {classes} = useLayout()
  return (
    <div className={'footer py-4 d-flex flex-lg-column'} id='kt_footer'>
      <div
        className={clsx(
          classes.footerContainer,
          'd-flex flex-column flex-md-row align-items-center justify-content-end'
        )}
      >
        <div className='order-2 order-md-1'>
          <span className='text-muted fw-bold me-1'>
            {new Date().getFullYear()}&copy; <b>{intl.formatMessage({id: 'APP.CREATOR'})}</b>
          </span>
        </div>
      </div>
    </div>
  )
}

export {Footer}
