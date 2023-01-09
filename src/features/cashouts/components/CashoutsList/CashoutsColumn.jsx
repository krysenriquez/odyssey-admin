import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import {toCurrency} from '@/utils/toCurrency'
import {useNavigate} from 'react-router-dom'
import {ActionsCell} from '@/components/elements/Table/Cell/ActionsCell'
import {ActionCell} from '@/components/elements/Table/Cell/ActionCell'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

export const cashoutsColumn = [
  {
    header: 'Cashout #',
    accessorFn: (row) => row.activityNumber,
    id: 'activityNumber',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.activityAmount,
    id: 'activityAmount',
    cell: (info) => {
      const intl = useIntl()
      return toCurrency(info.getValue())
    },
  },
  {
    header: 'Wallet',
    accessorFn: (row) => row.wallet,
    id: 'wallet',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
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
      return format(Date.parse(info.getValue()), 'dd/MM/yyyy')
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.activityNumber,
    id: 'cashoutsAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.activityNumber}`, {
          state: {activityNumber: info.row.original.activityNumber},
        })
      }

      return (
        <ActionCell
          handleClick={handleView}
          className='btn btn-icon btn-icon-primary btn-light btn-sm border-0 me-2'
        >
          <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
        </ActionCell>
      )
    },
  },
]
