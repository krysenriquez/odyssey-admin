import {useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useMembersListQueryData,
  useMembersListQueryLoading,
} from '@/features/members/stores/MembersListQueryProvider'
import {membersColumns} from './MembersColumns'

export const MembersListTable = () => {
  const members = useMembersListQueryData()
  const isLoading = useMembersListQueryLoading()
  const tableData = useMemo(() => members, [members])
  const tableColumns = useMemo(() => membersColumns, [])

  return (
    <>
      <CustomCard>
        <CustomTable2
          {...{
            data: tableData,
            columns: tableColumns,
          }}
        />
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}
