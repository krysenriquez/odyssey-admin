import {Tab} from 'bootstrap'
import {useEffect, useRef} from 'react'
import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
  SwapperComponent,
} from '@/components/assets/components'
import {useLayout} from '@/providers/layout/LayoutProvider'

export function MasterInit() {
  const {config} = useLayout()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
      document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
        Tab.getOrCreateInstance(tab)
      })
    }, 500)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      pluginsInitialization()
    }
  }, [config])

  return <></>
}
