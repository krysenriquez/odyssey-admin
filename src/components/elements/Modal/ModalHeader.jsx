import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const ModalHeader = ({title, handleClick}) => {
  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>{title}</h2>
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        onClick={() => handleClick()}
        style={{cursor: 'pointer'}}
      >
        <CustomSVG path='/media/icons/actions/close.svg' className='svg-icon-1' />
      </div>
    </div>
  )
}

export default ModalHeader
