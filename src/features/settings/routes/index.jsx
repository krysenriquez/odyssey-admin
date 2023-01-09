import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {SettingsList} from './SettingsList'

const SettingsRoutes = () => {
  const intl = useIntl()

  const settingsBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SETTINGS'}),
      path: '/settings',
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
            <PageTitle breadcrumbs={settingsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS'})}
            </PageTitle>
            <SettingsList />
          </>
        }
      />
    </Routes>
  )
}

export default SettingsRoutes
