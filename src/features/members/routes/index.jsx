import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {MembersListWrapper} from '../components/MembersList/MembersListWrapper'
import {MemberInfoWrapper} from '../components/MemberInfo/MemberInfoWrapper'

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
            <MembersListWrapper />
          </>
        }
      />
      <Route
        path=':account_id'
        element={
          <>
            <PageTitle breadcrumbs={membersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'MEMBERS.INFO'})}
            </PageTitle>
            <MemberInfoWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default MembersRoutes
