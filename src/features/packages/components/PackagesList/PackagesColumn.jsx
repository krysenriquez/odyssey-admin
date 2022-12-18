import clsx from 'clsx'
import {toCurrency} from '@/utils/toCurrency'
export const packagesColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.packageName,
    id: 'packageName',
    cell: (info) => <span className='mx-2'>{info.getValue()}</span>,
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.packageAmount,
    id: 'packageAmount',
    cell: (info) => <span className='mx-2'>{toCurrency(info.getValue())}</span>,
  },
  {
    header: 'Point Value',
    accessorFn: (row) => row.pointValue + ' PV',
    id: 'pointValue',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Flushout Limit',
    accessorFn: (row) => row.flushOutLimit + ' PV',
    id: 'flushOutLimit',
    cell: (info) => info.getValue(),
  },
]
