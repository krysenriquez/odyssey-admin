import {useField} from 'formik'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {useIntl} from 'react-intl'

export default function SelectField(props) {
  const intl = useIntl()
  const {label, required, errorText, data, translate, ...rest} = props
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
      <label className='form-label mb-3'>
        <span className={clsx({required: required})}>{label}</span>
      </label>
      <select
        {...field}
        value={selectedValue ? selectedValue : ''}
        className={clsx('form-control form-control-solid', {
          'is-invalid': isError,
          'is-valid': isValid,
        })}
      >
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {translate ? intl.formatMessage({id: item.label}) : item.label}
          </option>
        ))}
      </select>
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
