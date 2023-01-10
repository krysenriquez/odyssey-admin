import {useEffect} from 'react'
import {MenuComponent} from '@/components/assets/components'
import {CustomSVG} from '../../SVG/CustomSVG'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const ActionsCell = (props) => {
  const {buttons, label} = props

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-menu-trigger='click'
        data-menu-placement='bottom-end'
      >
        {label}
        <CustomSVG path='/media/icons/arrows/caret-down.svg' className='svg-icon-5 m-0' />
      </a>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-menu='true'
      >
        {buttons ? (
          buttons.map((button) => {
            return (
              <div className='menu-item px-3' key={button.label}>
                <a className='menu-link px-3' onClick={button.handleClick}>
                  {button.label}
                </a>
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export {ActionsCell}
