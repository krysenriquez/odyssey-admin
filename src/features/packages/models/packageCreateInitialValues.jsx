import packageCreateFormModel from './packageCreateFormModel'
const {
  formField: {
    packageName,
    packageAmount,
    pointValue,
    flushOutLimit,
    hasPairing,
    isFranchise,
    isBco,
  },
} = packageCreateFormModel

export default {
  [packageName.key]: '',
  [packageAmount.key]: 0,
  [pointValue.key]: 0,
  [flushOutLimit.key]: 0,
  [hasPairing.key]: false,
  [isFranchise.key]: false,
  [isBco.key]: false,
}
