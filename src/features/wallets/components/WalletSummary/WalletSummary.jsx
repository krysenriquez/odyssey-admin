import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {useEffect, useMemo} from 'react'
import {walletSummaryColumn} from './WalletSummaryColumn'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {toPointValue} from '@/utils/toCurrency'

export const WalletSummary = () => {
  const {walletSummary} = useWallet()

  const tableData = useMemo(() => walletSummary, [walletSummary])
  const tableColumns = useMemo(() => walletSummaryColumn, [])
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
