import {useIntl} from 'react-intl'
import {toCurrency, toPointValue} from '@/utils/toCurrency'
import {useMembers} from '@/features/members/stores/MembersProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const TopEarners = () => {
  const intl = useIntl()
  const {topEarners} = useMembers()

  return (
    <div className='card card-flush h-xl-100'>
      <div className='card-header pt-7'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-gray-800'>Top Earners</span>
        </h3>
      </div>
      <div className='card-body pt-3 pb-4'>
        <div className='table-responsive'>
          <table className='table table-row-dashed align-middle gs-0 gy-4 my-0'>
            <thead>
              <tr className='fs-7 fw-bold text-gray-500 border-bottom-0'>
                <th className='p-0 w-200px w-xxl-450px' />
                <th className='p-0 w-100px' />
              </tr>
            </thead>
            <tbody>
              {topEarners ? (
                topEarners.map((earner) => {
                  return (
                    <tr key={earner.accountNumber}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol- symbol-40px me-3'>
                            <img
                              src={
                                earner.accountAvatar
                                  ? earner.accountAvatar
                                  : toAbsoluteUrl('/media/avatars/blank.png')
                              }
                              className=''
                              alt=''
                            />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'>
                              {earner.accountNumber} - {earner.accountName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <a
                          href='#'
                          className='text-gray-800 fw-bold text-hover-primary d-block mb-1 fs-6'
                        >
                          {toCurrency(earner.walletAmount)}
                        </a>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
