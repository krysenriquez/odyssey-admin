import {useField} from 'formik'
import clsx from 'clsx'

export default function FloatingInputField(props) {
  const {label, required, id, errorText, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      <div className='form-floating'>
        <input
          type='text'
          className={clsx('form-control', {
            'is-invalid': isError,
            'is-valid': isValid,
          })}
          {...field}
          {...rest}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
