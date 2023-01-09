import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {format} from 'date-fns'
import {useMemo} from 'react'
import {useIntl} from 'react-intl'
import {MemberInfoPvWallets} from './MemberInfoPvWallets'
import {useMemberInfoQueryData} from '../../../stores/MemberInfoQueryProvider'

export const MemberInfo = () => {
  const intl = useIntl()
  const member = useMemberInfoQueryData()

  return (
    <>
      {member ? (
        <div className='card card-flush mb-5 mb-xl-8'>
          <div className='card-header justify-content-end ribbon ribbon-start ribbon-clip'>
            <div className='ribbon-label'>
              <span className='text-gray-400 fw-bold'>{member.accountPackage}</span>
              <span className='ribbon-inner bg-warning'></span>
            </div>
          </div>
          <div className='card-body'>
            <div className='d-flex flex-center flex-column pb-5 mt-n15'>
              <div className='symbol symbol-100px symbol-circle mb-7'>
                <img
                  src={
                    member.avatarInfo && member.avatarInfo.fileAttachment
                      ? member.avatarInfo.fileAttachment
                      : toAbsoluteUrl('/media/avatars/blank.png')
                  }
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 text-hover-primary fw-bold mb-3'>
                {member.accountNumber} - {member.fullName}
              </div>
              <div className='mb-9'>
                <div className='badge badge-lg badge-light-primary d-inline'>
                  {member.accountStatus ? intl.formatMessage({id: member.accountStatus}) : <></>}
                </div>
              </div>
              <MemberInfoPvWallets />
            </div>
            <div className='d-flex flex-stack fs-4 py-3'>
              <div className='fw-bold'>Details</div>
            </div>
            <div className='separator' />
            <div>
              <div className='pb-5 fs-6'>
                <div className='fw-bold mt-5'>Account ID</div>
                <div className='text-gray-600'>{member.accountId}</div>
                <div className='fw-bold mt-5'>Parent Account</div>
                <div className='text-gray-600'>
                  {member.parentAccountNumber} - {member.parentName}{' '}
                  <span className='badge badge-outline badge-primary'>
                    {member.parentSide ? intl.formatMessage({id: member.parentSide}) : <></>}
                  </span>
                </div>
                <div className='fw-bold mt-5'>Sponsor Account</div>
                <div className='text-gray-600'>
                  {member.referrerAccountNumber} - {member.referrerName}
                </div>
                <div className='fw-bold mt-5'>Address</div>
                {member.addressInfo ? (
                  <div className='text-gray-600'>
                    {member.addressInfo.street} {member.addressInfo.city} {member.addressInfo.state}
                  </div>
                ) : (
                  <></>
                )}
                {member.contactInfo ? (
                  <>
                    <div className='fw-bold mt-5'>Contact Number</div>
                    <div className='text-gray-600'>{member.contactInfo.contactNumber}</div>
                  </>
                ) : (
                  <></>
                )}
                <div className='fw-bold mt-5'>Created</div>
                <div className='text-gray-600'>
                  {member.created ? (
                    format(Date.parse(member.created), 'dd/MM/yyyy HH:mm:ss aa')
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
