import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {generateCode} from '@/features/codes/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {useSettingsListQueryContext} from '../../stores/SettingsListQueryProvider'
import {useSettingsEditQueryData} from '../../stores/SettingsEditQueryProvider'

import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import settingsEditFormModel from '../../models/settingsEditFormModel'
import settingsEditFormSchema from '../../models/settingsEditFormSchema'

export const SettingsEditForm = () => {
  const {toggleModal} = useModalContext()
  
  const {refetch} = useSettingsListQueryContext()
  const response = useSettingsEditQueryData()
  const [initialSettings, setInitialSettings] = useState({})

  const {
    formId,
    formField: {property, value},
  } = settingsEditFormModel

  useEffect(() => {
    setInitialSettings(response)
  }, [response])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={settingsEditFormSchema}
      initialValues={initialSettings}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
          const {data: response} = await generateCode(values)
          toast.success(response.message)
        } catch (ex) {
          toast.error(ex.message)
        } finally {
          setSubmitting(true)
          cancel(true)
        }
      }}
    >
      {({isSubmitting, isValid, touched}) => (
        <Form id={`formId`} className='form'>
          <div className='d-flex flex-column scroll-y me-n7 pe-4' id='kt_modal_add_user_scroll'>
            {/* <div className='mb-7'>
              <SelectField
                name={packagePlan.name}
                label={packagePlan.label}
                data={packagePlanOptions}
                required
              />
            </div>
            <div className='mb-7'>
              <SelectField
                name={codeType.name}
                label={codeType.label}
                data={codeTypes}
                required
                translate={true}
              />
            </div>
            <div className='row mb-7'>
              <div className='col-6'>
                <div className='mb-7'>
                  <SelectField
                    name={status.name}
                    label={status.label}
                    data={codeStatuses}
                    required
                    translate={true}
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='mb-7'>
                  <InputField name={quantity.name} label={quantity.label} required />
                </div>
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
            </div> */}
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
