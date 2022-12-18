import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import Modal from '@/components/elements/Modal/Modal'
import ModalHeader from '@/components/elements/Modal/ModalHeader'
import {PackageCreateForm} from '../PackageCreate/PackageCreateForm'
import {
  PackagesListQueryProvider,
  usePackagesListQueryData,
  usePackagesListQueryLoading,
} from './PackagesListQueryProvider'
import {packagesColumn} from './PackagesColumn'

const PackagesListPage = () => {
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
            toolbarButtonName: 'Add Package',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            closeOnOutsideClick={true}
            className={'mw-650px'}
          >
            <ModalHeader handleClick={toggleModal} title={'Create Package'} />
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <PackageCreateForm handleClick={toggleModal} />
            </div>
          </Modal>
        )}
      </CustomCard>
    </>
  )
}

const PackagesListWrapper = () => {
  return (
    <>
      <PackagesListQueryProvider>
        <PackagesListPage />
      </PackagesListQueryProvider>
    </>
  )
}

export {PackagesListWrapper}
