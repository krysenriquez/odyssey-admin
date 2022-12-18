import {Field, ErrorMessage} from 'formik'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {verifyCode} from '../../api'
import {toast} from 'react-toastify'
import {useState} from 'react'

const ActivationCode = () => {
  const [codePackage, setCodePackage] = useState()

  const validateCode = async (value) => {
    await verifyCode(value)
      .then((response) => {
        setCodePackage(response.data.package)
        toast.success(response.data.message)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <div className='w-100'>
      <div className='mb-7'>
        <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
          <span className='required'>Activation Code</span>
        </label>
        <Field
          type='text'
          className='form-control form-control-solid'
          placeholder=''
          name='activationCode'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='activationCode' />
        </div>
      </div>
    </div>
  )
}

export {ActivationCode}
