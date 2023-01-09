export default {
  formId: 'settingsEditForm',
  formField: {
    id: {
      key: 'id',
      name: 'id',
    },
    property: {
      key: 'property',
      name: 'property',
      label: 'Setting Property',
    },
    value: {
      key: 'value',
      name: 'value',
      label: 'Value',
      requiredErrorMsg: 'Value is required',
      invalidErrorMsg: 'Invalid Value format',
    },
  },
}
