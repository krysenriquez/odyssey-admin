import {useEffect, useRef} from 'react'
import clsx from 'clsx'

const Modal = ({className, isOpen, toggleModal, closeOnOutsideClick, children}) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='custom_modal'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className={clsx('modal-dialog modal-dialog-centered', className && className)}>
          <div className='modal-content  modal-rounded'>{children}</div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default Modal
