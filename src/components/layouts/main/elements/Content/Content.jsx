import {useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {DrawerComponent} from '@/components/assets/components'

const Content = ({children}) => {
  const {classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={clsx(classes.contentContainer.join(' '))}>
      {children}
    </div>
  )
}

export {Content}
