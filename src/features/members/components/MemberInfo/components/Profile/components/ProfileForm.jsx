import humps, {decamelizeKeys} from 'humps'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import InputField from '@/components/elements/Input/InputField'
import DatePickerField from '@/components/elements/Input/DatePickerField'
import SelectField from '@/components/elements/Input/SelectField'
import ImageInputField from '@/components/elements/Input/ImageInputField'

import {updateAccountProfile} from '@/features/members/api'
import profileFormModel from '@/features/members/models/Profile/profileFormModel'
import profileSchema from '@/features/members/models/Profile/profileSchema'
import profileInitialValues from '@/features/members/models/Profile/profileInitialValues'
import {useEffect} from 'react'
import {useState} from 'react'

const genders = [
  {
    value: null,
    label: 'Select Gender',
  },
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
]

export const ProfileForm = (props) => {
  const swal = withReactContent(Swal)
  const {profile, refetch} = props
  const {personalInfo, addressInfo, contactInfo, avatarInfo} = profile
  const [initialProfile, setInitialProfile] = useState(profileInitialValues)

  const {
    formId,
    formField: {
      avatarInfo: {fileName, fileAttachment},
      personalInfo: {birthdate, gender},
      contactInfo: {contactNumber},
      addressInfo: {street, city, state},
    },
  } = profileFormModel

  useEffect(() => {
    const initial = initialProfile
    initial.accountId = profile.accountId
    if (contactInfo) {
      initial.contactInfo = contactInfo
    }
    if (addressInfo) {
      initial.addressInfo = addressInfo
    }
    if (avatarInfo) {
      initial.avatarInfo.id = avatarInfo.id
      initial.avatarInfo.fileName = avatarInfo.fileName
      initial.avatarInfo.fileAttachment = avatarInfo.fileAttachment ? avatarInfo.fileAttachment : ''
    }
    if (personalInfo) {
      initial.personalInfo.id = personalInfo.id
      initial.personalInfo.gender = personalInfo.gender
      initial.personalInfo.birthdate = new Date(personalInfo.birthdate)
    }
    setInitialProfile((prevState) => {
      return {...prevState, ...initial}
    })
  }, [personalInfo, addressInfo, contactInfo, avatarInfo])

  const submit = async (values, actions) => {
    const formData = new FormData()
    const avatar = {...values.avatarInfo}
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'avatar_info') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (avatar.fileAttachment instanceof File) {
      for (var keys in avatar) {
        formData.append(`avatar_info['${keys}']`, avatar[keys])
      }
    }

    actions.setSubmitting(true)
    try {
      const {data: response} = await updateAccountProfile(formData)
      swal.fire('Account Updated!', response.message, 'success')
      console.log()
    } catch (ex) {
      toast.error(ex.message)
    } finally {
      actions.setSubmitting(true)
      refetch()
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0' role='button'>
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>Profile Details</h3>
        </div>
      </div>
      <div>
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={profileSchema}
          initialValues={initialProfile}
          onSubmit={submit}
        >
          {() => (
            <Form className='form' id={formId}>
              <div className='card-body border-top p-9'>
                <div className='row'>
                  <div className='col-12'>
                    <label className='form-label mb-3'>
                      <span>Avatar</span>
                    </label>
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-12'>
                    <ImageInputField name={fileAttachment.name} />
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-12'>
                    <DatePickerField name={birthdate.name} label={birthdate.label} required />
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-'>
                    <SelectField name={gender.name} label={gender.label} data={genders} required />
                  </div>
                </div>
                <div className='mb-5 row'>
                  <div className='col-12'>
                    <InputField name={contactNumber.name} label={contactNumber.label} required />
                  </div>
                </div>
                <div className='mb-5 row'>
                  <div className='col-4'>
                    <InputField name={street.name} label={street.label} />
                  </div>
                  <div className='col-4'>
                    <InputField name={city.name} label={city.label} required />
                  </div>
                  <div className='col-4'>
                    <InputField name={state.name} label={state.label} required />
                  </div>
                </div>
              </div>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button type='reset' className='btn btn-light btn-active-light-primary me-2'>
                  Discard
                </button>
                <button type='submit' className='btn btn-primary'>
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
