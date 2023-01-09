import {MembersListQueryProvider} from '@/features/members/stores/MembersListQueryProvider'
import {MembersListTable} from '../components/MembersList/MembersListTable'

export const MembersList = () => {
  return (
    <>
      <MembersListQueryProvider>
        <MembersListTable />
      </MembersListQueryProvider>
    </>
  )
}
