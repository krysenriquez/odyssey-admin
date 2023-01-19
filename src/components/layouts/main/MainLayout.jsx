import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {PageDataProvider} from '@/providers/PageDataProvider'
// Layout Components
import {AsideDefault} from './elements/Aside/AsideDefault'
import {Footer} from './elements/Footer/Footer'
import {HeaderWrapper} from './elements/Header/HeaderWrapper'
import {Toolbar} from './elements/Toolbar/Toolbar'
import {Content} from './elements/Content/Content'
import {ScrollTop} from './elements/Content/ScrollTop'
import {MenuComponent} from '../../assets/components'

const MainLayout = () => {
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root'>
        {/* begin::Page */}
        <div className='page d-flex flex-row flex-column-fluid'>
          <AsideDefault />
          {/* begin::Wrapper */}
          <div className='wrapper d-flex flex-column flex-row-fluid'>
            <HeaderWrapper />
            <Toolbar />
            {/* begin::Content */}
            <div className='content d-flex flex-column flex-column-fluid'>
              <Content>
                <Outlet />
              </Content>
            </div>
            {/* end::Content */}
            <Footer />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Page */}
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MainLayout}
