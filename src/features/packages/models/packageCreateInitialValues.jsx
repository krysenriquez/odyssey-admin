import packageCreateFormModel from './packageCreateFormModel'
const {
  formField: {packageName, packageAmount, pointValue, flushOutLimit, hasPairing, isBco},
} = packageCreateFormModel

export default {
  [packageName.key]: '',
  [packageAmount.key]: 0,
  [hasPairing.key]: true,
  [pointValue.key]: 0,
  [flushOutLimit.key]: 0,
  [isBco.key]: false,
}
