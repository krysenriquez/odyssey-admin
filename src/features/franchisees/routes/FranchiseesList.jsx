import {FranchiseesListQueryProvider} from '../stores/FranchiseesListQueryProvider'
import {FranchiseesListTable} from '../components/FranchiseesList/FranchiseesListTable'

export const FranchiseesList = () => {
  return (
    <>
      <FranchiseesListQueryProvider>
        <FranchiseesListTable />
      </FranchiseesListQueryProvider>
    </>
  )
}
