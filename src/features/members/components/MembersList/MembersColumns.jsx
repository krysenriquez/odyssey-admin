import clsx from 'clsx'

export const membersColumns = [
  {
    header: 'Account Number',
    accessorFn: (row) => row.account_number,
    id: 'account_number',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Name',
    accessorFn: (row) => row.account_name,
    id: 'account_name',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Package',
    accessorFn: (row) => row.account_package + '- ₱' + row.account_package_amount,
    id: 'account_package',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Parent Account',
    accessorFn: (row) =>
      row.parent_account_number
        ? row.parent_account_number + '-' + row.parent_account_name
        : 'None',
    id: 'parent_account',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Sponsor Account',
    accessorFn: (row) =>
      row.referrer_account_name
        ? row.referrer_account_number + '-' + row.referrer_account_name
        : 'None',
    id: 'referrer_account',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Active',
    accessorFn: (row) => row.account_status,
    id: 'account_status',
    cell: (info) => (
      <div
        className={clsx('badge fw-bolder', {
          'badge-light-success': info.getValue() == 'ACTIVE',
          'badge-light-warning': info.getValue() == 'PENDING',
          'badge-light-danger': info.getValue() == 'DEACTIVATED',
        })}
      >
        {info.getValue()}
      </div>
    ),
  },
]
