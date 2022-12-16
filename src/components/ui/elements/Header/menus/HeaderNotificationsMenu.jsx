import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {defaultLogs} from '@/mocks/dataExamples'

const HeaderNotificationsMenu = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
    data-kt-menu='true'
  >
    <div
      className='d-flex flex-column bgi-no-repeat rounded-top'
      style={{
        backgroundImage: `url('${toAbsoluteUrl('/public/media/misc/pattern-1.jpg')}')`,
      }}
    >
      <h3 className='text-white fw-bold px-9 mt-10 mb-6'>
        Notifications <span className='fs-8 opacity-75 ps-3'>24 reports</span>
      </h3>

      {/* <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9'>
        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_1'
          >
            Alerts
          </a>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4 active'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_2'
          >
            Updates
          </a>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_3'
          >
            Logs
          </a>
        </li>
      </ul> */}
    </div>
    <div>
      <div className='scroll-y mh-325px my-4 px-8 py-2 timeline'>
        {defaultLogs.map((log, index) => (
          <div key={`log${index}`} className='timeline-item'>
            <div className='timeline-line w-20px'></div>

            <div className='timeline-icon symbol symbol-circle symbol-20px'>
              <div className='symbol-label bg-light'>
                <CustomSVG
                  path='/public/media/icons/duotune/communication/com009.svg'
                  className='svg-icon-2 svg-icon-gray-500'
                />
              </div>
            </div>

            <div className='timeline-content mb-10 mt-n2'>
              <div className='overflow-auto pe-3'>
                <div className='fs-5 fw-bold mb-2'>{log.message}</div>
                <div className='d-flex align-items-center mt-1 fs-6'>
                  <div className='text-muted me-2 fs-7'>{log.time}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='py-3 text-center border-top'>
        <Link
          to='/crafted/pages/profile'
          className='btn btn-color-gray-600 btn-active-color-primary'
        >
          View All{' '}
          <CustomSVG path='/public/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
        </Link>
      </div>
    </div>
  </div>
)

export {HeaderNotificationsMenu}
