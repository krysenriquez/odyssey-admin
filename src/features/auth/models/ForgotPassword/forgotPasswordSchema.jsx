import {string, object, boolean} from 'yup'
import * as yup from 'yup'
import forgotPasswordFormModel from './forgotPasswordFormModel'

const {
  formField: {recoveryEmail},
} = forgotPasswordFormModel

export default object().shape({
  [recoveryEmail.key]: string()
    .email(`${recoveryEmail.invalidErrorMsg}`)
    .required(`${recoveryEmail.requiredErrorMsg}`),
})
