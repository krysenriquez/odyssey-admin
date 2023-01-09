import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useSettingsListQueryData,
  useSettingsListQueryLoading,
  useSettingsListQueryContext,
} from '../../stores/SettingsListQueryProvider'
import {settingsColumn} from './SettingsColumn'
import {SettingsEditModal} from '../SettingsEdit/SettingsEditModal'

export const SettingsListTable = () => {
  const navigate = useNavigate()
  const settings = useSettingsListQueryData()
  const isLoading = useSettingsListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableData = useMemo(() => settings, [settings])
  const tableColumns = useMemo(() => settingsColumn, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const editSetting = (variant) => {
    console.log(variant)
    toggleModal()
  }

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
            handleClick: editSetting,
            hasToolbar: false,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && <SettingsEditModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCard>
    </>
  )
}
