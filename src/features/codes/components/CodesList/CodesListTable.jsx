import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {useCodesListQueryData, useCodesListQueryLoading} from '../../stores/CodesListQueryProvider'
import {codesColumn} from './CodesColumn'
import {CodeCreateModal} from '../CodeCreate/CodeCreateModal'
import {usePermissions} from '@/providers/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

export const CodesListTable = () => {
  const navigate = useNavigate()
  const {permissions} = usePermissions()
  const codes = useCodesListQueryData()
  const isLoading = useCodesListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tableData = useMemo(() => codes, [codes])
  const tableColumns = useMemo(() => codesColumn, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCard>
        <CustomTable2
          {...{
            data: tableData,
            columns: tableColumns,
            hasToolbar: getRolePermission({
              permissions: permissions,
              permissionName: 'Code Management',
              permission: 'canCreate',
            }),
            toolbarButtonName: 'Generate Code',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && <CodeCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCard>
    </>
  )
}
