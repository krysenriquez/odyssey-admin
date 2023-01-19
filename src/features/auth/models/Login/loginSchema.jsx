import {string, object, boolean} from 'yup'
import * as yup from 'yup'
import loginFormModel from './loginFormModel'

const {
  formField: {username, password, tac},
} = loginFormModel

export default object().shape({
  [username.key]: string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(`${username.requiredErrorMsg}`),
  [password.key]: string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(`${password.requiredErrorMsg}`),
})
