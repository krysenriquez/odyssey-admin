import {useMemo} from 'react'
import {
  MemberInfoQueryProvider,
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from './MemberInfoQueryProvider'
import {Loading} from '@/components/elements/Loading/Loading'
import {MemberInfo} from './MemberInfo'

const MemberInfoPage = () => {
  const isLoading = useMemberInfoQueryLoading()
  const member = useMemberInfoQueryData()
  const data = useMemo(() => member[0], [member])

  return <>{isLoading ? <Loading /> : <MemberInfo member={data} />}</>
}

const MemberInfoWrapper = () => {
  return (
    <>
      <MemberInfoQueryProvider>
        <MemberInfoPage />
      </MemberInfoQueryProvider>
    </>
  )
}

export {MemberInfoWrapper}
