import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CodesList} from './CodesList'

const CodesRoutes = () => {
  const intl = useIntl()

  const codesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'CODES'}),
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
              {intl.formatMessage({id: 'CODES'})}
            </PageTitle>
            <CodesList />
          </>
        }
      />
    </Routes>
  )
}

export default CodesRoutes
