import {PackageCreateForm} from './PackageCreateForm'
import {CustomModal} from '@/components/elements/Modal/CustomModal'

export const PackageCreateModal = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Create Package',
  }

  return (
    <CustomModal {...value}>
      <PackageCreateForm />
    </CustomModal>
  )
}
