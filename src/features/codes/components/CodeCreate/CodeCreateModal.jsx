import {CodeCreateForm} from './CodeCreateForm'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {PackagesProvider} from '@/features/packages/stores/PackagesProvider'
import {EnumsProvider} from '@/providers/EnumsProvider'

export const CodeCreateModal = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Generate Code',
  }

  return (
    <CustomModal {...value}>
      <EnumsProvider>
        <PackagesProvider>
          <CodeCreateForm />
        </PackagesProvider>
      </EnumsProvider>
    </CustomModal>
  )
}
