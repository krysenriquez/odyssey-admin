import clsx from 'clsx'
import {useState} from 'react'
import {string, object, boolean, number} from 'yup'
import {useFormik, Field, ErrorMessage, Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {usePackagesListQueryContext} from '../PackagesList/PackagesListQueryProvider'
import {postPackage} from '@/features/packages/api'

const packageSchema = object().shape({
  packageName: string().required().label('Package Name'),
  packageAmount: number().required().label('Package Amount'),
  pointValue: number().required().label('Point Value'),
  flushOutLimit: number().required().label('Flushout Limit'),
  hasPairing: boolean(),
  isBco: boolean(),
})

const PackageCreateForm = ({handleClick}) => {
  const {refetch} = usePackagesListQueryContext()

  const [initialPackage] = useState({
    packageName: '',
    packageAmount: 0,
    hasPairing: true,
    pointValue: 0,
    flushOutLimit: 0,
    isBco: false,
  })

  return (
    <>
      <Formik
        validationSchema={packageSchema}
        initialValues={initialPackage}
        onSubmit={async (values, {setSubmitting}) => {
          setSubmitting(true)
          try {
            const {data: response} = await postPackage(values)
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            setSubmitting(true)
            handleClick(true)
          }
        }}
      >
        {({isSubmitting, isValid, touched}) => (
          <Form id='process_roder_form' className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-7' id='kt_modal_add_user_scroll'>
              <div className='mb-7'>
                <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Package Name</span>
                </label>
                <Field
                  type='text'
                  className='form-control form-control-solid'
                  placeholder=''
                  name='packageName'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='packageName' />
                </div>
              </div>
              <div className='mb-7'>
                <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                  <span className='required'>Package Amount</span>
                </label>
                <Field
                  type='number'
                  className='form-control form-control-solid'
                  placeholder=''
                  name='packageAmount'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='packageAmount' />
                </div>
              </div>
              {/* <input className="form-check-input" type="checkbox" value="1" checked="checked"></input> */}
              <div className='row mb-7'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Point Value</span>
                    </label>
                    <Field
                      type='number'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='pointValue'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='pointValue' />
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Flushout Limit</span>
                    </label>
                    <Field
                      type='number'
                      className='form-control form-control-solid'
                      placeholder=''
                      name='flushOutLimit'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='flushOutLimit' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span>Allow Package to have downline pairing?</span>
                    </label>
                    <label className='form-check form-switch form-check-custom form-check-solid'>
                      <Field className='form-check-input' type='checkbox' name='hasPairing' />
                      <span className='form-check-label fw-bold text-gray-400'>Has Pairing</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span>Make Package a Business Center Office?</span>
                    </label>
                    <label className='form-check form-switch form-check-custom form-check-solid'>
                      <Field className='form-check-input' type='checkbox' name='isBco' />
                      <span className='form-check-label fw-bold text-gray-400'>BCO</span>
                    </label>
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
        )}
      </Formik>
    </>
  )
}

export {PackageCreateForm}
