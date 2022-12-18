import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import Modal from '@/components/elements/Modal/Modal'
import ModalHeader from '@/components/elements/Modal/ModalHeader'
import {
  CodesListQueryProvider,
  useCodesListQueryData,
  useCodesListQueryLoading,
} from './CodesListQueryProvider'
import {codesColumn} from './CodesColumn'
import {CodeCreateForm} from '../CodeCreate/CodeCreateForm'

const CodesListPage = () => {
  const navigate = useNavigate()
  const codes = useCodesListQueryData()
  const isLoading = useCodesListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableData = useMemo(() => codes, [codes])
  const tableColumns = useMemo(() => codesColumn, [])

  const navigateToPackage = (variant) => {
    // navigate(`${variant.sku}`, {
    //   state: {sku: variant.sku},
    // })
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
            toolbarButtonName: 'Generate Code',
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
            <ModalHeader handleClick={toggleModal} title={'Generate Code'} />
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <CodeCreateForm handleClick={toggleModal} />
            </div>
          </Modal>
        )}
      </CustomCard>
    </>
  )
}

const CodesListWrapper = () => {
  return (
    <>
      <CodesListQueryProvider>
        <CodesListPage />
      </CodesListQueryProvider>
    </>
  )
}

export {CodesListWrapper}
