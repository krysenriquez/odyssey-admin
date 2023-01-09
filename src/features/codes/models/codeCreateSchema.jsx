import {string, object, boolean, number} from 'yup'
import {verifyAccountNumber} from '@/features/members/api'

import codeCreateFormModel from './codeCreateFormModel'
const {
  formField: {packagePlan, status, codeType, owner, quantity, isExpiring},
} = codeCreateFormModel

const validateAccountNumber = async (value, ctx) => {
  console.log(value, ctx)
  return await verifyAccountNumber(ctx.parent.owner)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: 'owner', message: err.response.data.message})
    })
}

export default object().shape({
  [packagePlan.key]: string().required(`${packagePlan.requiredErrorMsg}`),
  [status.key]: string().required(`${status.requiredErrorMsg}`),
  [owner.key]: string()
    .required(`${owner.requiredErrorMsg}`)
    .test({
      name: 'is-valid-account-number',
      test: (value, ctx) => validateAccountNumber(value, ctx),
      exclusive: true,
    }),
  [codeType.key]: string().required(`${codeType.requiredErrorMsg}`),
  [quantity.key]: number()
    .min(1)
    .integer(`${quantity.invalidErrorMsg}`)
    .required(`${quantity.requiredErrorMsg}`),
  [isExpiring.key]: boolean(),
})
