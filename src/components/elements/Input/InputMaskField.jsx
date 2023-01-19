import {useEffect, useState} from 'react'
import InputMask from 'react-input-mask'
import clsx from 'clsx'
import {useField} from 'formik'

export function InputMaskField(props) {
  const {label, required, errorText, mask, ...rest} = props
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
      <label className='form-label mb-3'>
        <span className={clsx({required: required})}>{label}</span>
      </label>
      <InputMask
        mask={mask}
        type='text'
        className={clsx('form-control form-control-solid', {
          'is-invalid': isError,
          'is-valid': isValid,
        })}
        {...field}
        {...rest}
      />
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
