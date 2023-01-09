import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import {toCurrency} from '@/utils/toCurrency'
export const walletSummaryColumn = [
  {
    header: 'Cashout #',
    accessorFn: (row) => row.activityNumber,
    id: 'activityNumber',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Type',
    accessorFn: (row) => row.activityType,
    id: 'activityType',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.activityAmount,
    id: 'activityAmount',
    cell: (info) => {
      return toCurrency(info.getValue())
    },
  },
  {
    header: 'Summary',
    accessorFn: (row) => row.activitySummary,
    id: 'activitySummary',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    id: 'status',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Created',
    accessorFn: (row) => row.created,
    id: 'created',
    cell: (info) => {
      return <span>{format(Date.parse(info.getValue()), 'dd/MM/yyyy')}</span>
    },
  },
]
