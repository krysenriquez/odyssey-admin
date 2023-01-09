import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {SettingsEditQueryProvider} from '../../stores/SettingsEditQueryProvider'
import {SettingsEditForm} from './SettingsEditForm'

export const SettingsEditModal = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Edit Settings',
  }

  return (
    <CustomModal {...value}>
      <SettingsEditQueryProvider>
        <SettingsEditForm></SettingsEditForm>
      </SettingsEditQueryProvider>
    </CustomModal>
  )
}
