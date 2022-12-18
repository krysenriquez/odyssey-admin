import clsx from 'clsx'
import {useIntl} from 'react-intl'

export const codesColumn = [
  {
    header: 'Code',
    accessorFn: (row) => row.code,
    id: 'code',
    cell: (info) => <span className='mx-2'>{info.getValue()}</span>,
  },
  {
    header: 'Package',
    accessorFn: (row) => row.packageName,
    id: 'packageName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Type',
    accessorFn: (row) => row.codeType,
    id: 'codeType',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Owned',
    accessorFn: (row) => row.isOwned,
    id: 'isOwned',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    id: 'status',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Expiration',
    accessorFn: (row) => row.expiration,
    id: 'expiration',
    cell: (info) => info.getValue(),
  },
]
