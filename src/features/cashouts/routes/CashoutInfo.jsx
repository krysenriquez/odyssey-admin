import {CashoutInfoQueryProvider} from '../stores/CashoutInfoQueryProvider'
import {CashoutInfoPage} from '../components/CashoutInfo/CashoutInfoPage'

export const CashoutInfo = () => {
  return (
    <>
      <CashoutInfoQueryProvider>
        <CashoutInfoPage />
      </CashoutInfoQueryProvider>
    </>
  )
}
