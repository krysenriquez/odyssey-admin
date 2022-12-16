import {Route, Routes, Outlet} from 'react-router-dom'
import {PackagesListWrapper} from '../components/PackagesList/PackagesListWrapper'

const PackagesRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <PackagesListWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default PackagesRoutes
