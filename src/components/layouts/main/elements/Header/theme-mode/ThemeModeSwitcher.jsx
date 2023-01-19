import clsx from 'clsx'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useThemeMode, systemMode} from '@/providers/ThemeModeProvider'

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}) => {
  const {mode, menuMode, updateMode, updateMenuMode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const switchMode = (_mode) => {
    updateMenuMode(_mode)
    updateMode(_mode)
  }

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        href='#'
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-menu-trigger={menuTrigger}
        data-menu-attach='parent'
        data-menu-placement={menuPlacement}
      >
        {calculatedMode === 'dark' && (
          <CustomSVG
            path='/media/icons/dark.svg'
            className={clsx('theme-light-hide', toggleBtnIconClass)}
          />
        )}

        {calculatedMode === 'light' && (
          <CustomSVG
            path='/media/icons/light.svg'
            className={clsx('theme-dark-hide', toggleBtnIconClass)}
          />
        )}
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'light',
            })}
            onClick={() => switchMode('light')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/light.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>Light</span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'dark',
            })}
            onClick={() => switchMode('dark')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/dark.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>Dark</span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'system',
            })}
            onClick={() => switchMode('system')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/system.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>System</span>
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {ThemeModeSwitcher}
