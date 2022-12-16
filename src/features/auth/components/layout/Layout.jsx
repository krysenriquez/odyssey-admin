import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const Layout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => {}
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/public/media/illustrations/dozzy/1.png')})`,
      }}
    >
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <div className='mb-12'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/public/media/logos/binary-admin-dark.svg')}
            className='theme-dark-show h-100px'
          />
          <img
            alt='Logo'
            src={toAbsoluteUrl('/public/media/logos/binary-admin.svg')}
            className='theme-light-show h-100px'
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
      <ToastContainer />
    </div>
  )
}
