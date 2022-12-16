import {Route, Routes, Outlet} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {DashboardWrapper} from '../components/DashboardWrapper'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <DashboardWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default DashboardRoutes
