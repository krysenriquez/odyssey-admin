import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {franchiseesColumn} from './FranchiseesColumn'
import {
  useFranchiseesListQueryData,
  useFranchiseesListQueryLoading,
} from '../../stores/FranchiseesListQueryProvider'

export const FranchiseesListTable = () => {
  const navigate = useNavigate()
  const franchisees = useFranchiseesListQueryData()
  const isLoading = useFranchiseesListQueryLoading()

  const tableData = useMemo(() => franchisees, [franchisees])
  const tableColumns = useMemo(() => franchiseesColumn, [])

  return (
    <>
      <CustomCard>
        <CustomTable2
          {...{
            data: tableData,
            columns: tableColumns,
            hasToolbar: false,
          }}
        />
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}
