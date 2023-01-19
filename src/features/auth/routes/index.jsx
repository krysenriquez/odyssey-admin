import {Route, Routes, Navigate} from 'react-router-dom'
import {AuthLayout} from '../components/AuthLayout'
import {LoginForm} from '../components/LoginForm'
import {ForgotPasswordForm} from '../components/ForgotPasswordForm'
import {ResetPasswordForm} from '../components/ResetPasswordForm'
import {ResetPasswordQueryProvider} from '../stores/ResetPasswordQueryProvider'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<LoginForm />} />
        <Route path='forgot-password' element={<ForgotPasswordForm />} />
        <Route
          path='reset-password'
          element={
            <ResetPasswordQueryProvider>
              <ResetPasswordForm />
            </ResetPasswordQueryProvider>
          }
        />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
