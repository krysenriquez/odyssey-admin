import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useState, useEffect, useRef, useMemo} from 'react'
import {string, object, boolean, number, array} from 'yup'
import {Field, ErrorMessage, Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {useMembersListQueryContext} from '../MembersList/MembersListQueryProvider'
import {StepperComponent} from '@/components/assets/components'
import {ActivationCode} from './ActivationCode'
import {generateCode} from '@/features/codes/api'
import {getEnum} from '@/providers/EnumsListProvider'
import {getPackages} from '@/features/packages/api'
import {verifyCode, verifyAccountNumber, createMember} from '../../api'
import {Aside} from './Aside'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {debounce} from 'lodash'

const memberSchema = object().shape({
  activationCode: string().required().label('Activation Code'),
  parentAccountId: string().required().label('Parent Account Number'),
  parentSide: string().required().label('Parent Side'),
  sponsorAccountId: string().required().label('Sponsor Account Number'),
  firstName: string().required().label('First Name'),
  middleName: string().label('Middle Name'),
  lastName: string().required().label('Last Name'),
  personalinfo: array(),
  contactinfo: array(),
  addressinfo: array(),
  avatarinfo: array(),
  user: string(),
})

const MemberCreateForm = ({handleClick}) => {
  const {refetch} = useMembersListQueryContext()
  const intl = useIntl()
  const [isValidated, setIsValidated] = useState(false)

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    handleClick()
  }

  const [initialMember, setInitialMember] = useState({
    parentAccountId: '',
    parentSide: '',
    activationCode: '',
    sponsorAccountId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    personalinfo: [{}],
    contactinfo: [{}],
    addressinfo: [{}],
    avatarinfo: [{}],
    user: '',
  })

  const enums = getEnum()
  const parentSides = enums['parentSides']
  const genders = enums['genders']

  const validateCode = async (value) => {
    await verifyCode(value)
      .then((response) => {
        // toast.success(response.data.message)
      })
      .catch((err) => {
        // toast.error(err.message)
      })
  }

  const validateAccountNumber = async (value) => {
    await verifyAccountNumber(value)
      .then((response) => {
        // toast.success(response.data.message)
      })
      .catch((err) => {
        // toast.error(err.message)
      })
  }

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={memberSchema}
      initialValues={initialMember}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
          const {data: response} = await createMember(values)
          toast.success(response.message)
        } catch (ex) {
          toast.error(ex.message)
        } finally {
          setSubmitting(true)
          cancel(true)
        }
      }}
    >
      {({isSubmitting, isValid, touched, validateForm, values}) => {
        const debouncedValidate = useMemo(() => debounce(validateForm, 500), [validateForm])

        useEffect(() => {
          console.log('calling deboucedValidate')
          debouncedValidate(values)
        }, [values, debouncedValidate])

        return (
          <Form id='process_roder_form' className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-4' id='kt_modal_add_user_scroll'>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Activation Code</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='activationCode'
                      validate={validateCode}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='activationCode' />
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Sponsor Account Number</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='sponsorAccountId'
                      validate={validateAccountNumber}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='sponsorAccountId' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Parent Account Number</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='parentAccountId'
                      validate={validateAccountNumber}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='parentAccountId' />
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Parent Side</span>
                    </label>
                    <Field
                      as='select'
                      className='form-control form-control-solid form-select'
                      placeholder=''
                      name='parentSide'
                    >
                      <option value='' key=''>
                        Select a Parent Side
                      </option>
                      {parentSides.map((side) => {
                        return (
                          <option value={side} key={side}>
                            {intl.formatMessage({id: side})}
                          </option>
                        )
                      })}
                    </Field>
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='parentSide' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>First Name</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='firstName'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='firstName' />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Middle Name</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='middleName'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='middleName' />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Last Name</span>
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='lastName'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='lastName' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center pt-15'>
              <button
                type='reset'
                onClick={() => handleClick()}
                className='btn btn-light me-3'
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting || !isValid || !touched}
              >
                <span className='indicator-label'>Submit</span>
                {isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export {MemberCreateForm}
