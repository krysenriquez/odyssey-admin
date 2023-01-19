export default {
  formId: 'forgotPasswordForm',
  formField: {
    newPassword: {
      key: 'newPassword',
      name: 'newPassword',
      label: 'New Password',
      requiredErrorMsg: 'New Password is required',
    },
    confirmNewPassword: {
      key: 'confirmNewPassword',
      name: 'confirmNewPassword',
      label: 'Confirm New Password',
      requiredErrorMsg: 'Confirm New Password is required',
      invalidErrorMsg: 'Passwords must match',
    },
  },
}
