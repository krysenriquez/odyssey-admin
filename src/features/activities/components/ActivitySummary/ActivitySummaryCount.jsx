import {useState} from 'react'
import {useIntl} from 'react-intl'
import {useActivity} from '@/features/activities/stores/ActivityProvider'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

export const ActivitySummaryCount = () => {
  const intl = useIntl()
  const {activitySummaryCount} = useActivity()

  return (
    <div className='card h-xl-100 card-xl-stretch mb-xl-8'>
      <div className='card-body p-0'>
        <div className='px-9 pt-7 card-rounded h-250px w-100 bg-danger'>
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Activity Summary</h3>
          </div>
        </div>
        <div
          className='bg-body shadow-sm card-rounded mx-9 px-6 py-9 position-relative z-index-1'
          style={{marginTop: '-150px'}}
        >
          {activitySummaryCount ? (
            activitySummaryCount.map((activity) => {
              return (
                <div className='d-flex align-items-center my-8' key={activity.activity}>
                  <div className='symbol symbol-45px w-40px me-5'>
                    <span className='symbol-label bg-lighten'>
                      <CustomSVG
                        path='/public/media/icons/communication/persons.svg'
                        className='svg-icon svg-icon-1 svg-icon-primary'
                      />
                    </span>
                  </div>
                  <div className='d-flex align-items-center flex-wrap w-100'>
                    <div className='mb-1 pe-3 flex-grow-1'>
                      <div className='fs-3 text-gray-800 text-hover-primary fw-bold'>
                        {intl.formatMessage({id: activity.activity})}
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div className='fw-bold fs-3 text-gray-800 me-8'>{activity.summary}</div>
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
  )
}
