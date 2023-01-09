import {useEffect, useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {activitiesListColumn} from './ActivitiesListColumn'
import {useActivitiesListQueryData} from '../../stores/ActivitiesListQueryProvider'

export const ActivitiesListTable = () => {
  const activitySummary = useActivitiesListQueryData()

  const tableData = useMemo(() => activitySummary, [activitySummary])
  const tableColumns = useMemo(() => activitiesListColumn, [])

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
          }}
        />
        {!tableData && <TableLoading />}
      </CustomCard>
    </>
  )
}
