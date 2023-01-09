import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'
import DashboardRoutes from '@/features/dashboard/routes'
import RolePermissionRoute from '@/utils/RolePermissionRoute'
import {useEffect} from 'react'

const PrivateRoutes = () => {
  // const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Members = lazy(() => import('@/features/members/routes'))
  const Franchisees = lazy(() => import('@/features/franchisees/routes'))
  const Cashouts = lazy(() => import('@/features/cashouts/routes'))
  const Activities = lazy(() => import('@/features/activities/routes'))
  const Packages = lazy(() => import('@/features/packages/routes'))
  const Codes = lazy(() => import('@/features/codes/routes'))
  const Settings = lazy(() => import('@/features/settings/routes'))

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
              <RolePermissionRoute permissionName='Member Management' permission='canRetrieve'>
                <Members />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'franchisees/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Franchisee Management' permission='canRetrieve'>
                <Franchisees />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'cashouts/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Cashout Management' permission='canRetrieve'>
                <Cashouts />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'activities/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Activity Management' permission='canRetrieve'>
                <Activities />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'packages/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Package Management' permission='canRetrieve'>
                <Packages />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'codes/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Code Management' permission='canRetrieve'>
                <Codes />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'settings/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute permissionName='Settings Management' permission='canRetrieve'>
                <Settings />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes
