import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {SimpleLayout} from '@/components/layouts/simple/SimpleLayout'
import {SuspensedView} from '@/utils/suspensedView'

const PublicRoutes = () => {
  const AuthRoutes = lazy(() => import('@/features/auth/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <SimpleLayout />,
      children: [
        {
          path: '*',
          element: (
            <SuspensedView>
              <AuthRoutes />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PublicRoutes
