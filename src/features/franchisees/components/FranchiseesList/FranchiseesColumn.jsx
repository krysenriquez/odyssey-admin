import clsx from 'clsx'
import {format} from 'date-fns'
import {toCurrency} from '@/utils/toCurrency'

export const franchiseesColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.fullName,
    id: 'fullName',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Referrer',
    accessorFn: (row) => row.referrerAccountNumber + '-' + row.referrerAccountName,
    id: 'referrer',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Package',
    accessorFn: (row) => row.packageName + ' - ' + toCurrency(row.packageAmount),
    id: 'accountPackage',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Created',
    accessorFn: (row) => row.created,
    id: 'created',
    cell: (info) => {
      return format(Date.parse(info.getValue()), 'dd/MM/yyyy')
    },
  },
]
