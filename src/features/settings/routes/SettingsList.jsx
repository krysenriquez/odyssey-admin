import {SettingsListQueryProvider} from '../stores/SettingsListQueryProvider'
import {SettingsListTable} from '../components/SettingsList/SettingsListTable'

export const SettingsList = () => {
  return (
    <>
      <SettingsListQueryProvider>
        <SettingsListTable />
      </SettingsListQueryProvider>
    </>
  )
}
