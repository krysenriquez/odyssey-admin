import clsx from 'clsx'
import {useLocation} from 'react-router'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {checkIsActive} from '@/utils/checkIsActive'
import {useLayout} from '@/providers/layout/LayoutProvider'

const AsideMenuItemWithSub = ({children, to, title, icon, fontIcon, hasBullet}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-menu-sub='accordion'
      data-menu-trigger='click'
    >
      <span className='menu-link'>
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
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div
        className={clsx('menu-sub menu-sub-accordion', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSub}
