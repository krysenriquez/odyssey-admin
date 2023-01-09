export default {
  formId: 'packageCreateForm',
  formField: {
    packageName: {
      key: 'packageName',
      name: 'packageName',
      label: 'Package Name',
      requiredErrorMsg: 'Package Name is required',
    },
    packageAmount: {
      key: 'packageAmount',
      name: 'packageAmount',
      label: 'Package Amount',
      requiredErrorMsg: 'Package Amount is required',
      invalidErrorMsg: 'Invalid Package Amount format',
    },
    pointValue: {
      key: 'pointValue',
      name: 'pointValue',
      label: 'Point Value',
      requiredErrorMsg: 'Point Value is required',
      invalidErrorMsg: 'Invalid Point Value format',
    },
    flushOutLimit: {
      key: 'flushOutLimit',
      name: 'flushOutLimit',
      label: 'Flushout Limit',
      requiredErrorMsg: 'Flushout Limit is required',
      invalidErrorMsg: 'Invalid Flushout Limit format',
    },
    hasPairing: {
      key: 'hasPairing',
      name: 'hasPairing',
      label: 'Has Expiring',
    },
    isBco: {
      key: 'isBco',
      name: 'isBco',
      label: 'Is Business Center Office',
    },
  },
}
