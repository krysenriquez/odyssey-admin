import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {PackagesList} from './PackagesList'

const PackagesRoutes = () => {
  const intl = useIntl()

  const packageBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PACKAGES'}),
      path: '/packages',
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
            <PageTitle breadcrumbs={packageBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PACKAGES'})}
            </PageTitle>
            <PackagesList />
          </>
        }
      />
    </Routes>
  )
}

export default PackagesRoutes
