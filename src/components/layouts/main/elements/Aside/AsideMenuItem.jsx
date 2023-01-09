import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {checkIsActive} from '@/utils/checkIsActive'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useLayout} from '@/providers/layout/LayoutProvider'

const WithOverlay = ({bsTitle, children}) => {
  return (
    <OverlayTrigger
      placement='right'
      delay={{show: 250, hide: 400}}
      overlay={(props) => (
        <Tooltip id='button-tooltip' {...props}>
          {bsTitle}
        </Tooltip>
      )}
    >
      <>{children}</>
    </OverlayTrigger>
  )
}

const MenuItem = ({
  to,
  className,
  outside,
  title,
  fontIcon,
  bsTitle,
  hasBullet,
  icon,
  children,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  const overlayAttributes = bsTitle
    ? {
        'data-bs-toggle': 'tooltip',
        'data-bs-trigger': 'hover',
        'data-bs-dismiss': 'click',
        'data-bs-placement': 'right',
        'data-bs-original-title': bsTitle,
      }
    : {}

  return (
    <div className={clsx('menu-item', isActive && 'here show', className)}>
      {outside ? (
        <a href={to} target='_blank' className={clsx('menu-link menu-center', {active: isActive})}>
          {fontIcon && aside.menuIcon === 'font' && (
            <>
              <span className='menu-icon me-0'>
                <i className={clsx('bi', fontIcon, 'fs-2')}></i>
              </span>
              <span className='menu-title'>{title}</span>
            </>
          )}
        </a>
      ) : (
        <>
          <Link className='menu-link menu-center' to={to} {...overlayAttributes}>
            {hasBullet && (
              <span className='menu-bullet'>
                <span className='bullet bullet-dot'></span>
              </span>
            )}
            {icon && aside.menuIcon === 'svg' && (
              <span className='menu-icon'>
                <CustomSVG path={icon} className='svg-icon-2' />
              </span>
            )}
            {fontIcon && aside.menuIcon === 'font' ? (
              <>
                <span className='menu-icon me-0'>
                  <i className={clsx('bi', fontIcon)}></i>
                </span>
                <span className='menu-title'>{title}</span>
              </>
            ) : (
              <span className='menu-title'>{title}</span>
            )}
          </Link>
          {children}
        </>
      )}
    </div>
  )
}

const AsideMenuItem = (props) => {
  if (props.bsTitle) {
    return (
      <WithOverlay {...props}>
        <MenuItem {...props}>{props.children}</MenuItem>
      </WithOverlay>
    )
  }

  return <MenuItem {...props}>{props.children}</MenuItem>
}
export {AsideMenuItem}
