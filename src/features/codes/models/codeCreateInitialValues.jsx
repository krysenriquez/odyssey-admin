import codeCreateFormModel from './codeCreateFormModel'
const {
  formField: {packagePlan, status, owner, codeType, quantity, isExpiring},
} = codeCreateFormModel

export default {
  [packagePlan.key]: '',
  [status.key]: '',
  [codeType.key]: '',
  [owner.key]: '',
  [quantity.key]: 1,
  [isExpiring.key]: false,
}
