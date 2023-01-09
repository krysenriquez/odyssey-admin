import {string, object, boolean, number} from 'yup'
import settingsEditFormModel from './settingsEditFormModel'

const {
  formField: {value},
} = settingsEditFormModel

export default object().shape({
  [value.key]: number()
    .min(1)
    .integer(`${value.invalidErrorMsg}`)
    .required(`${value.requiredErrorMsg}`),
})
