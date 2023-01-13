import codeCreateFormModel from './codeCreateFormModel'
const {
  formField: {packagePlan, owner, codeType, quantity, isExpiring},
} = codeCreateFormModel

export default {
  [packagePlan.key]: '',
  [codeType.key]: '',
  [owner.key]: '',
  [quantity.key]: 1,
  [isExpiring.key]: false,
}
