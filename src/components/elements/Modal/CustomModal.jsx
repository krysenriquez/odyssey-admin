import {createContext, useContext, useState} from 'react'
import {Modal} from 'react-bootstrap'

const ModalContext = createContext({
  toggleModal: () => {},
})

const ModalProvider = ({children, toggleModal}) => {
  const value = {
    toggleModal: toggleModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

const useModalContext = () => useContext(ModalContext)

const CustomModal = (props) => {
  const {isModalOpen, toggleModal, dialogClassName, title, children} = props

  return (
    <ModalProvider toggleModal={toggleModal}>
      <Modal show={isModalOpen} onHide={toggleModal} centered dialogClassName={dialogClassName}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </ModalProvider>
  )
}

export {CustomModal, useModalContext}
