import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {useCodesListQueryContext} from '../../stores/CodesListQueryProvider'
import {generateCode} from '@/features/codes/api'
import {useEnums} from '@/providers/EnumsProvider'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {arrayObjectToSelectOptions, arrayToSelectOptions} from '@/utils/arrayToSelectOptions'
import {usePackages} from '@/features/packages/stores/PackagesProvider'

import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import codeCreateFormModel from '../../models/codeCreateFormModel'
import codeCreateSchema from '../../models/codeCreateSchema'
import codeCreateInitialValues from '../../models/codeCreateInitialValues'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const CodeCreateForm = () => {
  const {toggleModal} = useModalContext()
  const {refetch} = useCodesListQueryContext()
  const swal = withReactContent(Swal)
  const {packagePlans} = usePackages()
  const {enums} = useEnums()
  const [initialCode, setInitialCode] = useState(codeCreateInitialValues)
  const {
    formId,
    formField: {packagePlan, status, owner, codeType, quantity, isExpiring},
  } = codeCreateFormModel

  const [packagePlanOptions, setPackagePlanOptions] = useState([])
  const [codeTypes, setCodeTypes] = useState([])

  useEffect(() => {
    if (packagePlans) {
      setPackagePlanOptions(
        arrayObjectToSelectOptions(packagePlans, 'id', 'packageName', 'Select Package')
      )
    }
  }, [packagePlans])

  useEffect(() => {
    if (enums) {
      setCodeTypes(arrayToSelectOptions(enums['codeTypes'], 'SELECT_CODE_TYPE'))
    }
  }, [enums])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submitForm = async (values, actions) => {
    swal
      .fire({
        title: 'Generate Code?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Generate',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await generateCode(values)
            swal.fire('Code Generated!', response.message, 'success')
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
    <Formik
      enableReinitialize={true}
      validationSchema={codeCreateSchema}
      initialValues={initialCode}
      onSubmit={submitForm}
    >
      {({isSubmitting, isValid, touched}) => (
        <Form id={formId} className='form'>
          <div className='d-flex flex-column scroll-y me-n7 pe-4' id='kt_modal_add_user_scroll'>
            <div className='row mb-7'>
              <div className='col-6'>
                <SelectField
                  name={packagePlan.name}
                  label={packagePlan.label}
                  data={packagePlanOptions}
                  required
                />
              </div>
              <div className='col-6'>
                <SelectField
                  name={codeType.name}
                  label={codeType.label}
                  data={codeTypes}
                  required
                  translate={true}
                />
              </div>
            </div>
            <div className='row mb-7'>
              <div className='col-12'>
                <InputField name={owner.name} label={owner.label} required />
              </div>
            </div>
            <div className='row mb-7'>
              <div className='col-12'>
                <InputField name={quantity.name} label={quantity.label} required />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className='mb-7'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span>Set code to have expiration?</span>
                  </label>
                  <label className='form-check form-switch form-check-custom form-check-solid'>
                    <CheckboxField name={isExpiring.name} label={isExpiring.label} required />
                  </label>
                </div>
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
  )
}
