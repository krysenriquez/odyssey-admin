import {Suspense} from 'react'
import {Routes, Route, BrowserRouter, Outlet} from 'react-router-dom'
import {AuthInit, useAuth} from '@/providers/AuthProvider'
import {Logout} from '@/features/auth/components/Logout'
import {I18nProvider} from '@/providers/i18n/i18nProvider'
import {LayoutProvider} from '@/providers/layout/LayoutProvider'
import {LayoutSplashScreen} from '@/providers/SplashScreen'
import {MasterInit} from '@/components/ui/MasterInit'
// import {ErrorsPage} from 'features/errors/ErrorsPage'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'

const {PUBLIC_URL} = import.meta.env

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export const AppRoutes = () => {
  const {auth} = useAuth()
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          {/* <Route path='error/*' element={<ErrorsPage />} /> */}
          <Route path='logout' element={<Logout />} />
          {auth ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
            </>
          ) : (
            <>
              <Route path='/*' element={<PublicRoutes />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
