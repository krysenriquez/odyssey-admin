import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {useIntl} from 'react-intl'
import {useAuth} from '@/providers/AuthProvider'
import {toast} from 'react-toastify'
import {getUserByToken, login} from '../api'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import loginFormModel from '../models/Login/loginFormModel'
import loginSchema from '../models/Login/loginSchema'
import loginInitialValues from '../models/Login/loginInitialValues'

export const LoginForm = () => {
  const intl = useIntl()
  const {saveAuth, setCurrentUser} = useAuth()

  const {
    formId,
    formField: {username, password},
  } = loginFormModel

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: auth} = await login(values.username, values.password)
      saveAuth(auth)
      const data = await getUserByToken(auth.access)
      setCurrentUser(data)
      toast.success('Login Success!')
    } catch (error) {
      saveAuth(undefined)
      toast.error('Login Failed!')
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
        validationSchema={loginSchema}
        initialValues={loginInitialValues}
        onSubmit={submit}
      >
        {(actions) => (
          <Form className='form w-100' id={formId}>
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'LOGIN.HEADER'})}</h1>
            </div>
            <div className='mb-10'>
              <InputField name={username.name} label={username.label} required />
            </div>
            <div className='mb-2'>
              <PasswordField name={password.name} label={password.label} required />
            </div>
            <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
              <div></div>
              <Link
                to='/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{marginLeft: '5px'}}
              >
                Forgot Password ?
              </Link>
            </div>
            <div className='fv-row mb-10'></div>
            <div className='text-center mb-10'>
              <button
                type='submit'
                className='btn btn-lg btn-primary w-100'
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
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
