import React, {useState, useEffect} from 'react'
import {useField} from 'formik'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'

export default function DatePickerField(props) {
  const {label, required, errorText} = props
  const [field, meta, helper] = useField(props)
  const {touched, error} = meta
  const {setValue} = helper
  const isError = touched && error && true
  const {value} = field

  // const [selectedDate, setSelectedDate] = useState(null)

  // useEffect(() => {
  //   if (value) {
  //     const date = new Date(value).toISOString().split('T')[0]
  //     setSelectedDate(date)
  //   }
  // }, [value])

  // function onChange(date) {
  //   if (date) {
  //     setSelectedDate(date)
  //     try {
  //       format(parseISO('2019-02-11T14:00:00'), 'MM/dd/yyyy')
  //       const ISODateString = date.toLocaleDateString()
  //       setValue(ISODateString)
  //     } catch (error) {
  //       setValue(date)
  //     }
  //   } else {
  //     setValue(date)
  //   }
  // }

  // function onChange(date) {
  //   console.log(date)
  //   const ISODateString = date.toLocaleDateString().split('T')[0]
  //   console.log(ISODateString)
  //   setValue(ISODateString)
  // }

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
      <DatePicker
        {...field}
        {...props}
        selected={value}
        dateFormat='yyyy-MM-dd'
        onChange={(date) => setValue(date)}
        className='form-control form-control-solid'
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
      />
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
