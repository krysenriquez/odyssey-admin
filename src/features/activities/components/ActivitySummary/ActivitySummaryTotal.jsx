import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/stores/ActivityProvider'
import {useMemberInfoQueryData} from '@/features/members/stores/MemberInfoQueryProvider'
import {getActivity} from '../../api'
import {useState} from 'react'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {ActivitySummaryTable} from './ActivitySummaryTable'

const ActivitySummaryModal = (prop) => {
  const intl = useIntl()
  const {isModalOpen, toggleModal, activityName} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: intl.formatMessage({id: activityName}) + ' Summary',
  }

  return (
    <CustomModal {...value}>
      <ActivitySummaryTable />
    </CustomModal>
  )
}

export const ActivitySummaryTotal = () => {
  const intl = useIntl()
  const member = useMemberInfoQueryData()
  const {activitySummaryTotal, setActivitySummary} = useActivity()
  const [activityName, setActivityName] = useState(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetActivity = async (activity) => {
    await getActivity({activityType: activity, accountId: member.accountId}).then((response) => {
      setActivityName(activity)
      setActivitySummary(response)
      toggleModal()
    })
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='card card-flush h-xl-100'>
      <div className='card-header pt-7'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-800'>Activity Totals</span>
        </h3>
      </div>
      <div className='card-body d-flex align-items-end'>
        <div className='w-100'>
          {activitySummaryTotal ? (
            activitySummaryTotal.map((activity, index) => {
              return (
                <div key={activity.activity}>
                  <div className='d-flex flex-stack'>
                    <div className='d-flex align-items-center me-5'>
                      <div className='me-5'>
                        <span className='text-gray-800 fw-bold text-hover-primary fs-6'>
                          {intl.formatMessage({id: activity.activity})}
                        </span>
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
                      <span className='text-gray-800 fw-bold fs-4 me-3'>
                        {intl.formatMessage({id: activity.activity}) !== 'PV Sales Match'
                          ? toCurrency(activity.total)
                          : toPointValue(activity.total)}
                      </span>
                      <button
                        className='btn btn-icon btn-light btn-sm border-0'
                        onClick={() => {
                          handleGetActivity(activity.activity)
                        }}
                      >
                        <CustomSVG
                          path='/public/media/icons/arrows/right-arrow.svg'
                          className='svg-icon svg-icon-2 svg-icon-primary'
                        />
                      </button>
                    </div>
                  </div>
                  <div className='separator separator-dashed my-3' />
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ActivitySummaryModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          activityName={activityName}
        />
      )}
    </div>
  )
}
