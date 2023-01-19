import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useIntl} from 'react-intl'
import {requestResetPassword} from '../api'
import InputField from '@/components/elements/Input/InputField'

import forgotPasswordFormModel from '../models/ForgotPassword/forgotPasswordFormModel'
import forgotPasswordSchema from '../models/ForgotPassword/forgotPasswordSchema'
import forgotPasswordInitialValues from '../models/ForgotPassword/forgotPasswordInitialValues'

export const ForgotPasswordForm = () => {
  const intl = useIntl()
  const swal = withReactContent(Swal)

  const {
    formId,
    formField: {recoveryEmail},
  } = forgotPasswordFormModel

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: response} = await requestResetPassword(values)
      swal.fire('Email sent to Recovery Email Address!', response.message, 'success')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      actions.setSubmitting(false)
      actions.resetForm()
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={forgotPasswordSchema}
        initialValues={forgotPasswordInitialValues}
        onSubmit={submit}
      >
        {(actions) => (
          <Form className='form w-100' id={formId}>
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'FORGOT.HEADER'})}</h1>
              <div className='text-gray-500 fw-semibold fs-6'>
                Enter your recovery email to reset your password.
              </div>
            </div>
            <div className='fv-row mb-10'>
              <InputField name={recoveryEmail.name} label={recoveryEmail.label} required />
            </div>
            <div className='fv-row mb-10'></div>
            <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
              <button
                type='submit'
                className='btn btn-primary me-4'
                disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
              >
                {!actions.isSubmitting && <span className='indicator-label'>Continue</span>}
                {actions.isSubmitting && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <Link to='/' className='btn btn-light'>
                Cancel
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
