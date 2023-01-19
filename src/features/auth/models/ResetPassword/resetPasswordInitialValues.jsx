import resetPasswordFormModel from './resetPasswordFormModel'

const {
  formField: {newPassword, confirmNewPassword},
} = resetPasswordFormModel

export default {
  [newPassword.key]: '',
  [confirmNewPassword.key]: '',
}
