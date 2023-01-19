import {string, object, ref} from 'yup'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)
import resetPasswordFormModel from './resetPasswordFormModel'

const {
  formField: {newPassword, confirmNewPassword},
} = resetPasswordFormModel

export default object().shape({
  [newPassword.key]: string()
    .min(8, 'Password must be at least 8 characters')
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minSymbols(1, 'Password must contain at least 1 special character')
    .required(`${newPassword.requiredErrorMsg}`),
  [confirmNewPassword.key]: string()
    .required(`${confirmNewPassword.requiredErrorMsg}`)
    .oneOf([ref('newPassword'), null], `${confirmNewPassword.invalidErrorMsg}`),
})
