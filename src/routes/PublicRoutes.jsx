import {lazy} from 'react'
import {BrowserRouter, useRoutes} from 'react-router-dom'

const AuthRoutes = lazy(() => import('@/features/auth/routes'))

const PublicRoutes = () => {
  const routes = useRoutes([
    {
      path: '/*',
      element: <AuthRoutes />,
    },
  ])
  return <>{routes}</>
}

export default PublicRoutes
