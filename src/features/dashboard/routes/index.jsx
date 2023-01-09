import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {DashboardWrapper} from '../components/DashboardWrapper'

const DashboardRoutes = () => {
  const intl = useIntl()

  const codesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'DASHBOARD'}),
      path: '/codes',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <PageTitle breadcrumbs={codesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'DASHBOARD'})}
            </PageTitle>
            <DashboardWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default DashboardRoutes
