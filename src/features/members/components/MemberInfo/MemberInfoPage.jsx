import {MemberInfo} from './components/MemberInfo'
import {Genealogy} from '@/features/genealogy/components/Genealogy'
import {MemberInfoPrimaryWallets} from '@/features/members/components/MemberInfo/components/MemberInfoPrimaryWallets'
import {WalletProvider} from '@/features/wallets/stores/WalletProvider'
import {ActivityProvider} from '@/features/activities/stores/ActivityProvider'
import {ActivitySummaryCount} from '@/features/activities/components/ActivitySummary/ActivitySummaryCount'
import {ActivitySummaryTotal} from '@/features/activities/components/ActivitySummary/ActivitySummaryTotal'

export const MemberInfoPage = () => {
  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10'>
        <MemberInfo />
      </div>
      <div className='flex-lg-row-fluid ms-lg-15'>
        <ul
          className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
          role='tablist'
        >
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4 active'
              data-kt-countup-tabs='true'
              data-bs-toggle='tab'
              href='#Overview'
              data-kt-initialized={1}
              aria-selected='false'
              role='tab'
              tabIndex={-1}
            >
              Overview
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4 '
              data-bs-toggle='tab'
              href='#genealogy'
              aria-selected='true'
              role='tab'
            >
              Genealogy
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4'
              data-bs-toggle='tab'
              href='#kt_user_view_overview_events_and_logs_tab'
              aria-selected='false'
              role='tab'
              tabIndex={-1}
            >
              History
            </a>
          </li>
        </ul>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade active show' id='Overview' role='tabpanel'>
            <div className='row row-cols-1 row-cols-md-2 mb-6 mb-xl-9'>
              <WalletProvider>
                <MemberInfoPrimaryWallets />
              </WalletProvider>
            </div>
            <div className='row row-cols-1 row-cols-md-2 mb-6 mb-xl-9'>
              <ActivityProvider>
                <div className='col-xl-6'>
                  <ActivitySummaryCount />
                </div>
                <div className='col-xl-6'>
                  <ActivitySummaryTotal />
                </div>
              </ActivityProvider>
            </div>
          </div>
        </div>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade' id='genealogy' role='tabpanel'>
            <div className='card card-flush mb-6 mb-xl-9'>
              <div className='card-header mt-6'>
                <div className='card-title flex-column'>
                  <h2 className='mb-1'>Genealogy</h2>
                </div>
              </div>
              <div className='card-body d-flex flex-column'>
                <Genealogy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
