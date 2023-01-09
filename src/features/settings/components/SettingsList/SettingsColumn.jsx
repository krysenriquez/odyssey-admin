import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {toCurrency} from '@/utils/toCurrency'
import {ActionsCell} from '@/components/elements/Table/Cell/ActionsCell'
import {useSettingsListQueryContext} from '../../stores/SettingsListQueryProvider'

export const settingsColumn = [
  {
    header: 'Setting Name',
    accessorFn: (row) => row.property,
    id: 'property',
    cell: (info) => {
      const intl = useIntl()
      return <span className='ms-4'>{intl.formatMessage({id: info.getValue()})}</span>
    },
  },
  {
    header: 'Value',
    accessorFn: (row) => row.value,
    id: 'value',
    cell: (info) => {
      const findTerm = (term) => {
        if (info.row.original.property.includes(term)) {
          return info.row.original.property
        }
      }

      switch (info.row.original.property) {
        case findTerm('EXPIRATION'):
          return <span>{parseInt(info.getValue())} hours</span>
        case findTerm('CONVERSION'):
        case findTerm('PERCENTAGE'):
          return <span>{parseInt(info.getValue())}%</span>
        case findTerm('REQUIREMENT'):
          return <span>{toCurrency(info.getValue())}</span>
        case findTerm('LENGTH'):
          return <span>{parseInt(info.getValue())} characters</span>
        case findTerm('OVERRIDE'):
          return <span>{info.getValue() == 1 ? 'true' : 'false'}</span>
        default:
          return info.getValue()
      }
    },
  },
]
