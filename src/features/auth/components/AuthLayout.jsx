import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const AuthLayout = () => {
  return (
    <>
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <div className='mb-8'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/public/media/logos/tci.png')}
            className='theme-dark-show h-300px'
          />
          <img
            alt='Logo'
            src={toAbsoluteUrl('/public/media/logos/tci.png')}
            className='theme-light-show h-300px'
          ></img>
        </div>
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
      </div>
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-semibold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>
          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>
          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
    </>
  )
}
