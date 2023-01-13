import {ActivityProvider} from '@/features/activities/stores/ActivityProvider'
import {WalletProvider} from '@/features/wallets/stores/WalletProvider'
import {MembersProvider} from '@/features/members/stores/MembersProvider'
import {FranchiseesProvider} from '@/features/franchisees/stores/FranchiseesProvider'
import {ActivitySummaryTotal} from './widgets/ActivitySummaryTotal'
import {ActivitySummaryCount} from './widgets/ActivitySummaryCount'
import {CompanyWallet} from './widgets/CompanyWallet'
import {TopEarners} from './widgets/TopEarners'
import {ActivitySummaryTotalCarousel} from './widgets/ActivitySummaryTotalCarousel'
import {MemberFranchiseeSummary} from './widgets/MemberFranchiseeSummary'
const DashboardPage = () => {
  return (
    <>
      <div className='card-deck'>
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
          <div className='col-xxl-9'>
            <WalletProvider>
              <CompanyWallet />
            </WalletProvider>
          </div>
          <div className='col-xxl-3'>
            <FranchiseesProvider>
              <MemberFranchiseeSummary />
            </FranchiseesProvider>
          </div>
        </div>
      </div>
      <div className='row g-5 g-xl-8 mb-5 mb-xl-10'>
        <ActivityProvider>
          <ActivitySummaryTotal />
          <div className='col-xl-6'>
            <ActivitySummaryCount />
          </div>
        </ActivityProvider>
        <MembersProvider>
          <div className='col-xl-6'>
            <TopEarners />
          </div>
        </MembersProvider>
      </div>
    </>
  )
}

const DashboardWrapper = () => {
  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
