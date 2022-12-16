import {useEffect, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  MembersListQueryProvider,
  useMembersListQueryData,
  useMembersListQueryLoading,
} from '@/features/members/components/MembersList/MembersListQueryProvider'
import {membersColumns} from './MembersColumns'

const MembersListPage = () => {
  const products = useMembersListQueryData()
  const isLoading = useMembersListQueryLoading()

  const data = useMemo(() => products, [products])
  const columns = useMemo(() => membersColumns, [])

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data,
            columns,
          }}
        />
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}

const MembersListWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Members'>
        {intl.formatMessage({id: 'MEMBERS'})}
      </PageTitle>
      <MembersListQueryProvider>
        <MembersListPage />
      </MembersListQueryProvider>
    </>
  )
}

export {MembersListWrapper}
