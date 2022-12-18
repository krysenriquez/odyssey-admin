import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import Modal from '@/components/elements/Modal/Modal'
import ModalHeader from '@/components/elements/Modal/ModalHeader'
import {
  MembersListQueryProvider,
  useMembersListQueryData,
  useMembersListQueryLoading,
} from '@/features/members/components/MembersList/MembersListQueryProvider'
import {membersColumns} from './MembersColumns'
import {MemberCreateForm} from '../MemberCreate/MemberCreateForm'
const MembersListPage = () => {
  const navigate = useNavigate()
  const members = useMembersListQueryData()
  const isLoading = useMembersListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tableData = useMemo(() => members, [members])
  const tableColumns = useMemo(() => membersColumns, [])

  const navigateToPackage = (member) => {
    navigate(`${member.account_id}`, {
      state: {account_id: member.account_id},
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
            toolbarButtonName: 'Add Member',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            closeOnOutsideClick={true}
            className={'mw-900px'}
          >
            <ModalHeader handleClick={toggleModal} title={'Add Member'} />
            <div className='modal-body py-lg-10 px-lg-10'>
              <MemberCreateForm handleClick={toggleModal} />
            </div>
          </Modal>
        )}
      </CustomCard>
    </>
  )
}

const MembersListWrapper = () => {
  return (
    <>
      <MembersListQueryProvider>
        <MembersListPage />
      </MembersListQueryProvider>
    </>
  )
}

export {MembersListWrapper}
