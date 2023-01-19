import {CustomTabs} from '@/components/elements/Tabs/Tabs'
import {Tab} from 'react-bootstrap'
import {MemberInfo} from './components/MemberInfo'
import {Genealogy} from '@/features/genealogy/components/Genealogy'
import {GenealogyDeeTree} from '@/features/genealogy/components/GenealogyD3'
import {MemberInfoPrimaryWallets} from '@/features/members/components/MemberInfo/components/MemberInfoPrimaryWallets'
import {WalletProvider} from '@/features/wallets/stores/WalletProvider'
import {ActivityProvider} from '@/features/activities/stores/ActivityProvider'
import {ActivitySummaryCount} from '@/features/activities/components/ActivitySummary/ActivitySummaryCount'
import {ActivitySummaryTotal} from '@/features/activities/components/ActivitySummary/ActivitySummaryTotal'
import {ProfileInfoPage} from './components/Profile/ProfileInfoPage'
import {MemberInfoUserQueryProvider} from '@/features/members/stores/MemberInfoUserQueryProvider'
import {useEffect, useState} from 'react'

export const MemberInfoPage = () => {
  const [tab, setTab] = useState('overview')

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10'>
        <MemberInfo />
      </div>
      <div className='flex-lg-row-fluid ms-lg-15'>
        <CustomTabs
          className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
          defaultActiveKey='overview'
          activeKey={tab}
          onSelect={(k) => setTab(k)}
        >
          <Tab eventKey='overview' title='Overview'>
            {tab == 'overview' ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </Tab>
          <Tab eventKey='genealogy' title='Genealogy'>
            {tab == 'genealogy' ? (
              <div className='card card-flush mb-6 mb-xl-9'>
                <div className='card-header mt-6'>
                  <div className='card-title flex-column'>
                    <h2 className='mb-1'>Genealogy</h2>
                  </div>
                </div>
                <div className='card-body d-flex flex-column'>
                  <GenealogyDeeTree />
                </div>
              </div>
            ) : (
              <></>
            )}
          </Tab>
          <Tab eventKey='profile' title='Profile'>
            {tab == 'profile' ? (
              <MemberInfoUserQueryProvider>
                <ProfileInfoPage />
              </MemberInfoUserQueryProvider>
            ) : (
              <></>
            )}
          </Tab>
        </CustomTabs>
      </div>
    </div>
  )
}
