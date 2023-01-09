import {useEffect, useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {useActivity} from '../../stores/ActivityProvider'
import {activitySummaryColumn} from './ActivitySummaryColumn'

export const ActivitySummaryTable = () => {
  const {activitySummary} = useActivity()

  const tableData = useMemo(() => activitySummary, [activitySummary])
  const tableColumns = useMemo(() => activitySummaryColumn, [])
  return (
    <>
      <CustomCard resetSidePaddings={true}>
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
