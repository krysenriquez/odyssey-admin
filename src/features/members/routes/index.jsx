import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {MembersList} from './MembersList'
import {MemberInfo} from './MemberInfo'
// import {MemberInfoWrapper} from '../components/MemberInfo/MemberInfoWrapper'

const MembersRoutes = () => {
  const intl = useIntl()

  const membersBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'MEMBERS'}),
      path: '/members',
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
            <PageTitle breadcrumbs={membersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'MEMBERS'})}
            </PageTitle>
            <MembersList />
          </>
        }
      />
      <Route
        path=':accountId'
        element={
          <>
            <PageTitle breadcrumbs={membersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'MEMBERS.INFO'})}
            </PageTitle>
            <MemberInfo />
          </>
        }
      />
    </Routes>
  )
}

export default MembersRoutes
