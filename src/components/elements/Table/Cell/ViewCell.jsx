import {useEffect} from 'react'
import {MenuComponent} from '@/components/assets/components'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useNavigate} from 'react-router-dom'

const ViewCell = ({id, route}) => {
  const navigate = useNavigate()

  const viewRecord = () => {
    navigate(route + `/${id}`, {state: {id: id}})
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-icon btn-light btn-sm border-0'
        onClick={() => viewRecord()}
      >
        <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
      </button>
    </>
  )
}

export {ViewCell}
