import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  usePackagesListQueryData,
  usePackagesListQueryLoading,
} from '../../stores/PackagesListQueryProvider'
import {packagesColumn} from './PackagesColumn'
import {PackageCreateModal} from '../PackageCreate/PackageCreateModal'

export const PackagesListTable = () => {
  const navigate = useNavigate()
  const packages = usePackagesListQueryData()
  const isLoading = usePackagesListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableData = useMemo(() => packages, [packages])
  const tableColumns = useMemo(() => packagesColumn, [])

  const navigateToPackage = (variant) => {
    navigate(`${variant.sku}`, {
      state: {sku: variant.sku},
    })
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
            handleClick: navigateToPackage,
            hasToolbar: true,
            toolbarButtonName: 'Add Package',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && <PackageCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCard>
    </>
  )
}
