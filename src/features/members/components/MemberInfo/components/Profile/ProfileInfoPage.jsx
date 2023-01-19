import {ProfileForm} from './components/ProfileForm'
import {ChangeUsernameForm} from './components/ChangeUsernameForm'
import {ChangePasswordForm} from './components/ChangePasswordForm'
import {ChangeEmailAddressForm} from './components/ChangeEmaillAddressForm'
import {useMemberInfoQueryContext} from '@/features/members/stores/MemberInfoQueryProvider'
import {useMemberInfoUserQueryContext} from '@/features/members/stores/MemberInfoUserQueryProvider'
import {useEffect, useState} from 'react'

export const ProfileInfoPage = () => {
  const {response: member, refetch} = useMemberInfoQueryContext()

  const {response} = useMemberInfoUserQueryContext()
  const [memberUser, setMemberUser] = useState(undefined)
  console.log(member)

  useEffect(() => {
    if (response && response.user) {
      setMemberUser(response.user)
    }
  }, [response])

  return (
    <>
      {member ? <ProfileForm profile={member} refetch={refetch} /> : <></>}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header border-0'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Authentication Method</h3>
          </div>
        </div>
        <div className='card-body border-top p-9'>
          <ChangeUsernameForm memberUser={memberUser} />
          <div className='separator separator-dashed my-6' />
          <ChangeEmailAddressForm memberUser={memberUser} />
          <div className='separator separator-dashed my-6' />
          <ChangePasswordForm memberUser={memberUser} />
          <div className='separator separator-dashed my-6' />
        </div>
      </div>
    </>
  )
}
