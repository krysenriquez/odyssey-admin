import {CashoutsListQueryProvider} from '../stores/CashoutsListQueryProvider'
import {CashoutsListTable} from '../components/CashoutsList/CashoutsListTable'

export const CashoutsList = () => {
  return (
    <CashoutsListQueryProvider>
      <CashoutsListTable />
    </CashoutsListQueryProvider>
  )
}
