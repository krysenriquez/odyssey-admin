export default {
  formId: 'codeCreateForm',
  formField: {
    packagePlan: {
      key: 'package',
      name: 'package',
      label: 'Package',
      requiredErrorMsg: 'Package is required',
    },
    status: {
      key: 'status',
      name: 'status',
      label: 'Status',
      requiredErrorMsg: 'Status is required',
    },
    owner: {
      key: 'owner',
      name: 'owner',
      label: 'Account Number',
      requiredErrorMsg: 'Account Number is required',
    },
    codeType: {
      key: 'codeType',
      name: 'codeType',
      label: 'Code Type',
      requiredErrorMsg: 'Code Type is required',
    },
    quantity: {
      key: 'quantity',
      name: 'quantity',
      label: 'Quantity',
      requiredErrorMsg: 'Quantity is required',
      invalidErrorMsg: 'Invalid Quantity format',
    },
    isExpiring: {
      key: 'isExpiring',
      name: 'isExpiring',
      label: 'Is Expiring',
    },
  },
}
