import {useState} from 'react'
import {useIntl} from 'react-intl'
import {useActivity} from '@/features/activities/stores/ActivityProvider'

export const ActivitySummaryCount = () => {
  const intl = useIntl()
  const {activitySummaryCount} = useActivity()

  return (
    <div className='card card-flush h-xl-100 card-xl-stretch mb-xl-8'>
      <div className='px-9 pt-7 card-rounded h-200px w-100 bg-primary'>
        <div className='d-flex flex-stack'>
          <h3 className='m-0 text-white fw-bold fs-3'>Activity Summary</h3>
        </div>
      </div>
      <div className='card-body mt-n20'>
        <div className='mt-n20 position-relative'>
          <div className='row g-2 g-lg-2'>
            {activitySummaryCount ? (
              activitySummaryCount.map((activity) => {
                return (
                  <div className='col-12' key={activity.activity}>
                    <div className='alert bg-light-info border-2 border-info border-dashed d-flex flex-column flex-sm-row'>
                      <div className='d-flex flex-stack'>
                        <div className='d-flex align-items-center'>
                          <div className='me-5'>
                            <div className='text-gray-800 fw-bold text-hover-primary fs-5'>
                              {intl.formatMessage({id: activity.activity})}
                            </div>
                          </div>
                        </div>
                        <div className='text-gray-800 fw-bold fs-3 text-end me-4'>
                          {activity.summary}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
