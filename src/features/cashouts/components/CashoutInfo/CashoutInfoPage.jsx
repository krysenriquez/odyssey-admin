import {useEffect, useMemo, useState} from 'react'
import {
  useCashoutInfoQueryContext,
  useCashoutInfoQueryData,
} from '../../stores/CashoutInfoQueryProvider'
import {format} from 'date-fns'
import {toast} from 'react-toastify'
import {useIntl} from 'react-intl'
import {toCurrency} from '@/utils/toCurrency'
import {useNavigate} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {updateCashoutStatus} from '../../api'

export const CashoutInfoPage = () => {
  const navigate = useNavigate()
  const intl = useIntl()
  const swal = withReactContent(Swal)
  const response = useCashoutInfoQueryData()
  const {refetch} = useCashoutInfoQueryContext()
  const cashout = useMemo(() => response, [response])
  const [submitting, setSubmitting] = useState(false)
  const [isReleased, setIsReleased] = useState(false)

  const returnToList = () => {
    navigate(`/cashouts`)
  }

  const updateStatus = (status) => {
    swal
      .fire({
        title: 'Update Status?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Update',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setSubmitting(true)
          try {
            const response = await updateCashoutStatus({
              activityNumber: cashout.activityNumber,
              status: status,
            })
            console.log(response)
            swal.fire('Cashout Updated!', response.message, 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            setSubmitting(false)
            refetch()
          }
        }
      })
  }

  return (
    <div className='row g-5'>
      {cashout ? (
        <>
          <div className='card'>
            <div className='card-body p-lg-20'>
              <div className='d-flex flex-column flex-xl-row'>
                <div className='flex-lg-row-fluid me-xl-18 mb-10 mb-xl-0'>
                  <div className='mt-n1'>
                    <div className='m-0'>
                      <div className='fw-bold fs-3 text-gray-800 mb-8'>
                        Invoice #{cashout.activityNumber}
                      </div>
                      <div className='row g-5 mb-4'>
                        <div className='col-sm-3'>
                          <div className='fw-semibold fs-7 text-gray-600 mb-1'>Created Date:</div>
                          <div className='fw-bold fs-6 text-gray-800'>
                            {cashout.created ? (
                              format(Date.parse(cashout.created), 'dd/MM/yyyy HH:mm:ss aa')
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-3'>
                          <div className='fw-semibold fs-7 text-gray-600 mb-1'>Modified Date:</div>
                          <div className='fw-bold fs-6 text-gray-800 d-flex align-items-center flex-wrap'>
                            <span className='pe-2'>
                              {cashout.created ? (
                                format(Date.parse(cashout.modified), 'dd/MM/yyyy HH:mm:ss aa')
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className='col-sm-3'>
                          <div className='fw-semibold fs-7 text-gray-600 mb-1'>Requested by:</div>
                          <div className='fw-bold fs-6 text-gray-800'>{cashout.accountName}</div>
                        </div>
                        <div className='col-sm-3'>
                          <div className='fw-semibold fs-7 text-gray-600 mb-1'>
                            Wallet Requested:
                          </div>
                          <div className='fw-bold fs-6 text-gray-800'>
                            {cashout.wallet ? intl.formatMessage({id: cashout.wallet}) : <></>}
                          </div>
                        </div>
                      </div>
                      <div className='row g-5 mb-12'></div>
                      <div className='flex-grow-1'>
                        <div className='table-responsive border-bottom mb-9'>
                          <table className='table mb-3'>
                            <thead>
                              <tr className='border-bottom fs-6 fw-bold text-muted'>
                                <th className='min-w-175px pb-2'>Description</th>
                                <th className='min-w-100px text-end pb-2'>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className='fw-bold text-gray-700 fs-5 text-end'>
                                <td className='d-flex align-items-center pt-6'>
                                  <i className='fa fa-genderless text-danger fs-2 me-2' />
                                  {cashout.activitySummary}
                                </td>
                                <td className='pt-6 text-dark fw-bolder'>
                                  {cashout.activityAmount ? (
                                    toCurrency(cashout.activityAmount)
                                  ) : (
                                    <></>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className='d-flex justify-content-end'>
                          <div className='mw-300px'>
                            <div className='d-flex flex-stack mb-3'>
                              <div className='fw-semibold pe-10 text-gray-600 fs-7'>Subtotal:</div>
                              <div className='text-end fw-bold fs-6 text-gray-800'>
                                {cashout.activityAmount ? (
                                  toCurrency(cashout.activityAmount)
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className='d-flex flex-stack mb-3'>
                              <div className='fw-semibold pe-10 text-gray-600 fs-7'>
                                Admin Fee {cashout.companyEarningTax}%
                              </div>
                              <div className='text-end fw-bold fs-6 text-gray-800'>
                                {cashout.activityAmountTotalTax ? (
                                  toCurrency(cashout.activityAmountTotalTax)
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className='d-flex flex-stack mb-3'>
                              <div className='fw-semibold pe-10 text-gray-600 fs-7'>
                                Subtotal - Admin Fee
                              </div>
                              <div className='text-end fw-bold fs-6 text-gray-800'>
                                {cashout.activityAmountTotal ? (
                                  toCurrency(cashout.activityAmountTotal)
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className='d-flex flex-stack'>
                              <div className='fw-semibold pe-10 text-gray-600 fs-7'>Total</div>
                              <div className='text-end fw-bold fs-6 text-gray-800'>
                                {cashout.activityAmountTotal ? (
                                  toCurrency(cashout.activityAmountTotal)
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='m-0'>
                  <div className='d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-250px p-9 bg-lighten'>
                    <div className='mb-8'>
                      <span className='badge badge-light-success'>
                        {cashout.status ? intl.formatMessage({id: cashout.status}) : <></>}
                      </span>
                    </div>
                    <h6 className='mb-8 fw-bolder text-primary'>Cashout Method</h6>
                    {cashout.contentObject ? (
                      <>
                        <div className='mb-6'>
                          <div className='fw-semibold text-gray-600 fs-7'>Method:</div>
                          <div className='fw-bold text-gray-800 fs-6'>
                            {cashout.contentObject.method}
                          </div>
                        </div>
                        <div className='mb-6'>
                          <div className='fw-semibold text-gray-600 fs-7'>Account Name:</div>
                          <div className='fw-bold text-gray-800 fs-6'>
                            {cashout.contentObject.accountName}
                          </div>
                        </div>
                        <div className='mb-6'>
                          <div className='fw-semibold text-gray-600 fs-7'>Account Number:</div>
                          <div className='fw-bold text-gray-800 fs-6'>
                            {cashout.contentObject.accountNumber}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className='d-flex flex-stack flex-wrap  mt-lg-5 pt-5'>
                <button type='button' className='btn btn-secondary' onClick={returnToList}>
                  Return
                </button>
                <div className='d-flex flex-wrap flex-center gap-3'>
                  {cashout.status == 'RELEASED' ? (
                    <></>
                  ) : (
                    <Dropdown as={ButtonGroup}>
                      <Button
                        onClick={() =>
                          updateStatus(cashout.status == 'APPROVED' ? 'RELEASED' : 'APPROVED')
                        }
                        className='btn btn-light-primary'
                      >
                        {cashout.status == 'APPROVED' ? 'Release' : 'Approve'}
                      </Button>
                      <Dropdown.Toggle
                        split
                        id='dropdown-split-basic'
                        className='btn btn-light-primary'
                      />
                      <Dropdown.Menu>
                        {cashout.status == 'APPROVED' ? (
                          <></>
                        ) : (
                          <Dropdown.Item onClick={() => updateStatus('RELEASED')}>
                            Release
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => updateStatus('DENIED')}>Deny</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body p-lg-20'>
              <h2>Logs</h2>
              <div className='table-responsive'>
                <table className='table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5'>
                  <tbody>
                    {cashout.details ? (
                      cashout.details.map((detail) => {
                        return (
                          <tr>
                            <td className='min-w-70px'>{detail.createdByUsername}</td>
                            <td className='text-success'>{detail.action}</td>
                            <td className='pe-0 text-end min-w-200px'>
                              {detail.created ? (
                                format(Date.parse(detail.created), 'dd/MM/yyyy HH:mm:ss aa')
                              ) : (
                                <></>
                              )}
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
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
