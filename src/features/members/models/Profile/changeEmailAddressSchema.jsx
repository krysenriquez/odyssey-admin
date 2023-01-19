import {string, object} from 'yup'

import profileFormModel from './profileFormModel'
const {
  formField: {
    user: {emailAddress, adminPassword},
  },
} = profileFormModel

export default object().shape({
  user: object({
    [emailAddress.key]: string()
      .email(`${emailAddress.invalidErrorMsg}`)
      .required(`${emailAddress.requiredErrorMsg}`),
    [adminPassword.key]: string().required(`${adminPassword.requiredErrorMsg}`),
  }),
})
