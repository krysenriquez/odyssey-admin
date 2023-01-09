import {useField} from 'formik'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export default function FloatingSelectField(props) {
  const {name, label, required, id, errorText, data, ...rest} = props
  const [field, meta] = useField(props)
  const {value: selectedValue} = field
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
        <select
          {...field}
          value={selectedValue ? selectedValue : ''}
          className={clsx('form-control', {
            'is-invalid': isError,
            'is-valid': isValid,
          })}
        >
          {data.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
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
