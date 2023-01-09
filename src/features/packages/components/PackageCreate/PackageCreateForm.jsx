import clsx from 'clsx'
import {useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {usePackagesListQueryContext} from '../../stores/PackagesListQueryProvider'
import {postPackage} from '@/features/packages/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'

import InputField from '@/components/elements/Input/InputField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import packageCreateFormModel from '../../models/packageCreateFormModel'
import packageCreateSchema from '../../models/packageCreateSchema'
import packageCreateInitialValues from '../../models/packageCreateInitialValues'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PackageCreateForm = () => {
  const {toggleModal} = useModalContext()
  const {refetch} = usePackagesListQueryContext()
  const swal = withReactContent(Swal)
  const [initialPackage, setInitialPackage] = useState(packageCreateInitialValues)
  const {
    formId,
    formField: {packageName, packageAmount, pointValue, flushOutLimit, hasPairing, isBco},
  } = packageCreateFormModel

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submitForm = async (values, actions) => {
    swal
      .fire({
        title: 'Create Package?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await postPackage(values)
            swal.fire('Package Created!', response.message, 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            actions.setSubmitting(true)
            cancel(true)
          }
        }
      })
  }

  return (
    <>
      <Formik
        validationSchema={packageCreateSchema}
        initialValues={initialPackage}
        onSubmit={submitForm}
      >
        {({isSubmitting, isValid, touched}) => (
          <Form id={formId} className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-7' id='kt_modal_add_user_scroll'>
              <div className='row g-9 mb-5'>
                <div className='col-md-6'>
                  <InputField name={packageName.name} label={packageName.label} required />
                </div>
                <div className='col-md-6'>
                  <InputField name={packageAmount.name} label={packageAmount.label} required />
                </div>
              </div>
              <div className='row g-9 mb-5'>
                <div className='col-md-6'>
                  <InputField name={pointValue.name} label={pointValue.label} required />
                </div>
                <div className='col-md-6'>
                  <InputField name={flushOutLimit.name} label={flushOutLimit.label} required />
                </div>
              </div>
              <div className='row g-9 mb-10'>
                <div className='col-6'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span>Allow Package to have downline pairing?</span>
                  </label>
                  <label className='form-check form-switch form-check-custom form-check-solid'>
                    <CheckboxField name={hasPairing.name} label={hasPairing.label} />
                  </label>
                </div>
              </div>
              <div className='row g-9 mb-5'>
                <div className='col-6'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span>Make Package a Business Center Office?</span>
                  </label>
                  <label className='form-check form-switch form-check-custom form-check-solid'>
                    <CheckboxField name={isBco.name} label={isBco.label} />
                  </label>
                </div>
              </div>
            </div>
            <div className='text-center pt-15'>
              <button
                type='reset'
                onClick={() => cancel()}
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
