import {Route, Routes, Outlet} from 'react-router-dom'
import {useParams, useLocation, useSearchParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {ActivitiesList} from './ActivitiesList'
import humps from 'humps'

const ActivitiesRoutes = () => {
  const intl = useIntl()
  const searchParams = useParams()
  const activityType = humps
    .decamelize(humps.camelize(searchParams['*']), {separator: '_'})
    .toUpperCase()

  const codesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'ACTIVITIES'}),
      path: '/activities',
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
        path=':activityType'
        element={
          <>
            <PageTitle breadcrumbs={''} description={intl.formatMessage({id: activityType})}>
              {intl.formatMessage({id: 'ACTIVITIES'})}
            </PageTitle>
            <ActivitiesList />
          </>
        }
      />
    </Routes>
  )
}

export default ActivitiesRoutes
