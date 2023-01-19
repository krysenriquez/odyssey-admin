import loginFormModel from './loginFormModel'

const {
  formField: {username, password, tac},
} = loginFormModel

export default {
  [username.key]: '',
  [password.key]: '',
}
