import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useState, useEffect, useRef} from 'react'
import {string, object, boolean, number, array} from 'yup'
import {Field, ErrorMessage, Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {useMembersListQueryContext} from '../MembersList/MembersListQueryProvider'
import {StepperComponent} from '@/components/assets/components'
import {ActivationCode} from './ActivationCode'
import {generateCode} from '@/features/codes/api'
import {getEnum} from '@/providers/EnumsListProvider'
import {getPackages} from '@/features/packages/api'
import {verifyCode} from '../../api'
import {Aside} from './Aside'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const memberSchema = object().shape({
  activationCode: string()
    .required()
    .label('Activation Code')
    .test('validActivationCode', 'Activation must be active', function (value) {
      return new Promise((resolve, reject) => {
        verifyCode(value)
          .then((response) => {
            toast.success(response.data.message)
            resolve(true)
          })
          .catch((err) => {
            toast.error(err.message)
            resolve(false)
          })
      })
    }),
  parentAccountId: string().required().label('Parent Account Number'),
  parentSide: string().required(),
  sponsorAccountId: string().required().label('Sponsor Account Number'),
  firstName: string().required().label('First Name'),
  middleName: string().label('Middle Name'),
  lastName: string().required().label('Last Name'),
  personalinfo: array(),
  contactinfo: array(),
  addressinfo: array(),
  avatarinfo: array(),
})

const MemberCreateForm = ({handleClick}) => {
  const {refetch} = useMembersListQueryContext()
  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const intl = useIntl()
  const [currentSchema, setCurrentSchema] = useState(memberSchema)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }
    stepper.current.goPrev()
  }

  const submitStep = (values, actions) => {
    if (!stepper.current) {
      return
    }

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    handleClick()
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

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
  })

  const enums = getEnum()
  const parentSides = enums['parentSides']
  const genders = enums['genders']

  //   useEffect(() => {
  //     const fetchPackages = async () => {
  //       const data = await getPackages()
  //       const results = []
  //       data.forEach((value) => {
  //         results.push({
  //           key: value.packageName,
  //           value: value.id,
  //         })
  //       })
  //       setPackages(results)
  //     }

  //     fetchPackages()
  //     setInitialMember((prevState) => ({
  //       ...prevState,
  //       package: '',
  //       status: '',
  //       codeType: '',
  //     }))
  //     setIsValidated(true)
  //   }, [])

  //   return isValidated ? (
  //     <Formik
  //       enableReinitialize={true}
  //       validationSchema={memberSchema}
  //       initialValues={initialMember}
  //       onSubmit={async (values, {setSubmitting}) => {
  //         setSubmitting(true)
  //         try {
  //           const {data: response} = await generateCode(values)
  //           toast.success(response.message)
  //         } catch (ex) {
  //           toast.error(ex.message)
  //         } finally {
  //           setSubmitting(true)
  //           cancel(true)
  //         }
  //       }}
  //     >
  //       {({isSubmitting, isValid, touched}) => (
  //         <Form id='process_roder_form' className='form'>
  //           <div className='d-flex flex-column scroll-y me-n7 pe-4' id='kt_modal_add_user_scroll'>
  //             <div className='mb-7'>
  //               <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
  //                 <span className='required'>Package Name</span>
  //               </label>
  //               <Field
  //                 as='select'
  //                 className='form-control form-control-solid form-select'
  //                 placeholder=''
  //                 name='package'
  //               >
  //                 <option value='' key=''>
  //                   Select a Package Name
  //                 </option>
  //                 {packages.map((packagePlan) => {
  //                   return (
  //                     <option value={packagePlan.value} key={packagePlan.value}>
  //                       {packagePlan.key}
  //                     </option>
  //                   )
  //                 })}
  //               </Field>
  //               <div className='text-danger mt-2'>
  //                 <ErrorMessage name='package' />
  //               </div>
  //             </div>
  //             <div className='mb-7'>
  //               <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
  //                 <span className='required'>Type</span>
  //               </label>
  //               <Field
  //                 as='select'
  //                 className='form-control form-control-solid'
  //                 placeholder=''
  //                 name='codeType'
  //               >
  //                 <option value='' key=''>
  //                   Select Code Type
  //                 </option>
  //                 {codeTypes.map((codeType) => {
  //                   return (
  //                     <option value={codeType} key={codeType}>
  //                       {intl.formatMessage({id: codeType})}
  //                     </option>
  //                   )
  //                 })}
  //               </Field>
  //               <div className='text-danger mt-2'>
  //                 <ErrorMessage name='codeType' />
  //               </div>
  //             </div>
  //             <div className='row mb-7'>
  //               <div className='col-6'>
  //                 <div className='mb-7'>
  //                   <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
  //                     <span className='required'>Status</span>
  //                   </label>
  //                   <Field
  //                     as='select'
  //                     className='form-control form-control-solid'
  //                     placeholder=''
  //                     name='status'
  //                   >
  //                     <option value='' key=''>
  //                       Select a Code Status
  //                     </option>
  //                     {codeStatuses.map((codeStatus) => {
  //                       return (
  //                         <option value={codeStatus} key={codeStatus}>
  //                           {intl.formatMessage({id: codeStatus})}
  //                         </option>
  //                       )
  //                     })}
  //                   </Field>
  //                   <div className='text-danger mt-2'>
  //                     <ErrorMessage name='status' />
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className='col-6'>
  //                 <div className='mb-7'>
  //                   <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
  //                     <span className='required'>Quantity</span>
  //                   </label>
  //                   <Field
  //                     type='number'
  //                     className='form-control form-control-solid'
  //                     placeholder=''
  //                     name='quantity'
  //                   />
  //                   <div className='text-danger mt-2'>
  //                     <ErrorMessage name='quantity' />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className='row'>
  //               <div className='col-6'>
  //                 <div className='mb-7'>
  //                   <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
  //                     <span>Set code to have expiration?</span>
  //                   </label>
  //                   <label className='form-check form-switch form-check-custom form-check-solid'>
  //                     <Field className='form-check-input' type='checkbox' name='isExpiring' />
  //                     <span className='form-check-label fw-bold text-gray-400'>Is Expiring</span>
  //                   </label>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className='text-center pt-15'>
  //             <button
  //               type='reset'
  //               onClick={() => handleClick()}
  //               className='btn btn-light me-3'
  //               disabled={isSubmitting}
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type='submit'
  //               className='btn btn-primary'
  //               disabled={isSubmitting || !isValid || !touched}
  //             >
  //               <span className='indicator-label'>Submit</span>
  //               {isSubmitting && (
  //                 <span className='indicator-progress'>
  //                   Please wait...{' '}
  //                   <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
  //                 </span>
  //               )}
  //             </button>
  //           </div>
  //         </Form>
  //       )}
  //     </Formik>
  //   ) : (
  //     <></>
  //   )
  return (
    <div className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid first'>
      <Aside />

      <div className='flex-row-fluid py-lg-5 px-lg-15'>
        <Formik validationSchema={memberSchema} initialValues={initialMember} onSubmit={submitStep}>
          {({}) => (
            <Form>
              <div className='current' data-kt-stepper-element='content'>
                <ActivationCode />
              </div>
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                  >
                    <CustomSVG
                      path='/media/icons/arrows/left-arrow.svg'
                      className='svg-icon-4 me-1'
                    />
                    Back
                  </button>
                </div>
                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totatStepsNumber - 1 && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totatStepsNumber - 1 && 'Submit'}
                      <CustomSVG
                        path='/media/icons/arrows/right-arrow.svg'
                        className='svg-icon-3 ms-2 me-0'
                      />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export {MemberCreateForm}
