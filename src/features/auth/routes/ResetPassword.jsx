import {ResetPasswordForm} from '../components/ResetPasswordForm'
import {useResetPasswordQueryContext} from '../stores/ResetPasswordQueryProvider'

export const ResetPassword = () => {
  const {verified} = useResetPasswordQueryContext()

  return <>{verified ? <ResetPasswordForm /> : <></>}</>
}
