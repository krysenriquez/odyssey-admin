import {string, object, boolean, number, array, ref, date, ValidationError} from 'yup'
import * as yup from 'yup'
import profileFormModel from './profileFormModel'
const {
  formField: {
    personalInfo: {birthdate, gender},
    contactInfo: {contactNumber},
    addressInfo: {street, city, state},
  },
} = profileFormModel

export default object().shape({
  personalInfo: object({
    [birthdate.key]: date(),
    [gender.key]: string().required(`${gender.requiredErrorMsg}`),
  }),
  contactInfo: object({
    [contactNumber.key]: string().required(`${contactNumber.requiredErrorMsg}`),
  }),
  addressInfo: object({
    [street.key]: string(),
    [city.key]: string().required(`${city.requiredErrorMsg}`),
    [state.key]: string().required(`${state.requiredErrorMsg}`),
  }),
})
