import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useActivity} from '@/features/activities/stores/ActivityProvider'

export const ActivitySummaryTotal = () => {
  const intl = useIntl()
  const {activitySummaryTotal} = useActivity()

  return (
    <>
      {activitySummaryTotal ? (
        activitySummaryTotal.map((activity, index) => {
          return (
            <div className='col-2' key={activity.activity}>
              <div className='card h-lg-100 w-100 card-dashed card-px-0'>
                <div className='card-body d-flex justify-content-between align-items-start flex-column px-5'>
                  <div className='d-flex flex-column my-7'>
                    <span className='fw-bold fs-2 text-primary'>
                      {intl.formatMessage({id: activity.activity}) !== 'PV Sales Match'
                        ? toCurrency(activity.total)
                        : toPointValue(activity.total)}
                    </span>
                    <div className='m-0'>
                      <span className='fw-bold fs-4 text-gray-800'>
                        {intl.formatMessage({id: activity.activity})}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <></>
      )}
    </>
  )
}
