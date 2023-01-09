import {useFranchisees} from '@/features/franchisees/stores/FranchiseesProvider'
export const MemberFranchiseeSummary = () => {
  const {summaries} = useFranchisees()
  return (
    <div
      className='card card-flush border-0 h-xl-100'
      data-theme='light'
      style={{backgroundColor: '#22232B'}}
    >
      <div className='card-header pt-2'>
        <h3 className='card-title'>
          <span className='text-white fs-3 fw-bold me-2'>Members and Franchisees</span>
        </h3>
      </div>
      <div className='card-body d-flex justify-content-between flex-column pt-0'>
        {summaries ? (
          summaries.map((summary) => {
            return (
              <div className='d-flex flex-column my-2' key={summary.summary}>
                <span className='fw-semibold fs-3x text-danger lh-1 ls-n2'>{summary.summary}</span>
                <div className='m-0'>
                  <span className='fw-semibold fs-6 text-gray-400'>{summary.model}</span>
                </div>
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
