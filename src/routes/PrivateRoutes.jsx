import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/ui/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'
import DashboardRoutes from '@/features/dashboard/routes'

const PrivateRoutes = () => {
  // const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Members = lazy(() => import('@/features/members/routes'))
  const Packages = lazy(() => import('@/features/packages/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {path: 'dashboard/*', element: <DashboardRoutes />},
        {
          path: 'members/*',
          element: (
            <SuspensedView>
              <Members />
            </SuspensedView>
          ),
        },
        {
          path: 'packages/*',
          element: (
            <SuspensedView>
              <Packages />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes
