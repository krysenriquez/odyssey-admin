import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {PackagesListWrapper} from '../components/PackagesList/PackagesListWrapper'

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
            <PackagesListWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default PackagesRoutes
