import profileFormModel from './profileFormModel'
const {
  formField: {
    personalInfo: {birthdate, gender},
    addressInfo: {street, city, state},
    contactInfo: {contactNumber},
    avatarInfo: {fileName, fileAttachment},
  },
} = profileFormModel

export default {
  personalInfo: {
    [birthdate.key]: new Date(),
    [gender.key]: '',
    id: '',
  },
  contactInfo: {
    [contactNumber.key]: '',
    id: '',
  },
  addressInfo: {
    [street.key]: '',
    [city.key]: '',
    [state.key]: '',
    id: '',
  },
  avatarInfo: {
    [fileName.key]: '',
    [fileAttachment.key]: '',
  },
}
