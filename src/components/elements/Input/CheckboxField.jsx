import {useField} from 'formik'
import clsx from 'clsx'

export default function CheckboxField(props) {
  const {label, required, errorText, ...rest} = props
  const [field, meta] = useField(props)

  return (
    <>
      <div className='form-check form-switch form-check-custom form-check-solid'>
        <input type='checkbox' className='form-check-input' {...field} {...rest} />
        <span className='form-check-label fw-bold text-gray-400'>{label}</span>
      </div>
    </>
  )
}
