import {string, object, boolean, number} from 'yup'
import packageCreateFormModel from './packageCreateFormModel'
const {
  formField: {packageName, packageAmount, pointValue, flushOutLimit, hasPairing, isBco},
} = packageCreateFormModel

export default object().shape({
  [packageName.key]: string().required(`${packageName.requiredErrorMsg}`),
  [packageAmount.key]: number()
    .min(0)
    .required(`${packageAmount.requiredErrorMsg}`)
    .integer(`${packageAmount.invalidErrorMsg}`),
  [pointValue.key]: number()
    .min(0)
    .required(`${pointValue.requiredErrorMsg}`)
    .integer(`${pointValue.invalidErrorMsg}`),
  [flushOutLimit.key]: number()
    .min(0)
    .required(`${flushOutLimit.requiredErrorMsg}`)
    .integer(`${flushOutLimit.invalidErrorMsg}`),
  [hasPairing.key]: boolean(),
  [isBco.key]: boolean(),
})
