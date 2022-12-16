import clsx from 'clsx'

export const packagesColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.package_name,
    id: 'package_name',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.package_amount,
    id: 'package_amount',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Point Value',
    accessorFn: (row) => row.point_value + ' PV',
    id: 'point_value',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Flushout Limit',
    accessorFn: (row) => row.flush_out_limit + ' PV',
    id: 'flush_out_limit',
    cell: (info) => info.getValue(),
  },
]
