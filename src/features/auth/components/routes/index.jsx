import {Route, Routes, Navigate} from 'react-router-dom'
import {Layout} from '../layout/Layout'
import {LoginForm} from '../LoginForm'
import {ForgotPasswordForm} from '../ForgotPasswordForm'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<LoginForm />} />
        <Route path='forgot-password' element={<ForgotPasswordForm />} />
        <Route index element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
