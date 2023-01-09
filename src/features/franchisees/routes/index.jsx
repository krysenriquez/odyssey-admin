import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {FranchiseesList} from './FranchiseesList'

const FranchiseeRoutes = () => {
  const intl = useIntl()

  const packageBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PACKAGES'}),
      path: '/franchisees',
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
            <FranchiseesList />
          </>
        }
      />
    </Routes>
  )
}

export default FranchiseeRoutes
