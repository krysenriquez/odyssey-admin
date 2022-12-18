import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useState, useEffect} from 'react'
import {string, object, boolean, number} from 'yup'
import {Field, ErrorMessage, Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {useCodesListQueryContext} from '../CodesList/CodesListQueryProvider'
import {generateCode} from '@/features/codes/api'
import {getEnum} from '@/providers/EnumsListProvider'
import {getPackages} from '@/features/packages/api'

const codeSchema = object().shape({
  package: string().required().label('Package Name'),
  codeType: string().required().label('Code Type'),
  status: string().required().label('Status'),
  isExpiring: boolean(),
  quantity: number().required().label('Quantity'),
})

const CodeCreateForm = ({handleClick}) => {
  const intl = useIntl()
  const {refetch} = useCodesListQueryContext()
  const [isValidated, setIsValidated] = useState(false)
  const [packages, setPackages] = useState([])
  const [initialCode, setInitialCode] = useState({
    package: '',
    status: '',
    codeType: '',
    quantity: 1,
    isExpiring: false,
  })

  const enums = getEnum()
  const codeStatuses = enums['codeStatuses']
  const codeTypes = enums['codeTypes']

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages()
      const results = []
      data.forEach((value) => {
        results.push({
          key: value.packageName,
          value: value.id,
        })
      })
      setPackages(results)
    }

    fetchPackages()
    setInitialCode((prevState) => ({
      ...prevState,
      package: '',
      status: '',
      codeType: '',
    }))
    setIsValidated(true)
  }, [])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    handleClick()
  }

  return isValidated ? (
    <Formik
      enableReinitialize={true}
      validationSchema={codeSchema}
      initialValues={initialCode}
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
        <Form id='process_roder_form' className='form'>
          <div className='d-flex flex-column scroll-y me-n7 pe-4' id='kt_modal_add_user_scroll'>
            <div className='mb-7'>
              <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                <span className='required'>Package Name</span>
              </label>
              <Field
                as='select'
                className='form-control form-control-solid form-select'
                placeholder=''
                name='package'
              >
                <option value='' key=''>
                  Select a Package Name
                </option>
                {packages.map((packagePlan) => {
                  return (
                    <option value={packagePlan.value} key={packagePlan.value}>
                      {packagePlan.key}
                    </option>
                  )
                })}
              </Field>
              <div className='text-danger mt-2'>
                <ErrorMessage name='package' />
              </div>
            </div>
            <div className='mb-7'>
              <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                <span className='required'>Type</span>
              </label>
              <Field
                as='select'
                className='form-control form-control-solid'
                placeholder=''
                name='codeType'
              >
                <option value='' key=''>
                  Select Code Type
                </option>
                {codeTypes.map((codeType) => {
                  return (
                    <option value={codeType} key={codeType}>
                      {intl.formatMessage({id: codeType})}
                    </option>
                  )
                })}
              </Field>
              <div className='text-danger mt-2'>
                <ErrorMessage name='codeType' />
              </div>
            </div>
            <div className='row mb-7'>
              <div className='col-6'>
                <div className='mb-7'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>Status</span>
                  </label>
                  <Field
                    as='select'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='status'
                  >
                    <option value='' key=''>
                      Select a Code Status
                    </option>
                    {codeStatuses.map((codeStatus) => {
                      return (
                        <option value={codeStatus} key={codeStatus}>
                          {intl.formatMessage({id: codeStatus})}
                        </option>
                      )
                    })}
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='status' />
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <div className='mb-7'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span className='required'>Quantity</span>
                  </label>
                  <Field
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='quantity'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='quantity' />
                  </div>
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
                    <Field className='form-check-input' type='checkbox' name='isExpiring' />
                    <span className='form-check-label fw-bold text-gray-400'>Is Expiring</span>
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
  ) : (
    <></>
  )
}

export {CodeCreateForm}
