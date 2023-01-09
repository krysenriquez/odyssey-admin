import {MemberInfoQueryProvider} from '../stores/MemberInfoQueryProvider'
import {MemberInfoPage} from '../components/MemberInfo/MemberInfoPage'

export const MemberInfo = () => {
  return (
    <>
      <MemberInfoQueryProvider>
        <MemberInfoPage />
      </MemberInfoQueryProvider>
    </>
  )
}
