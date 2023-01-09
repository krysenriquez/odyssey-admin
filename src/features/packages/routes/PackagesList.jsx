import {PackagesListQueryProvider} from '../stores/PackagesListQueryProvider'
import {PackagesListTable} from '../components/PackagesList/PackagesListTable'

export const PackagesList = () => {
  return (
    <>
      <PackagesListQueryProvider>
        <PackagesListTable />
      </PackagesListQueryProvider>
    </>
  )
}
