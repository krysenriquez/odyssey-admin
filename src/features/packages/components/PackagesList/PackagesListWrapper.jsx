import {useEffect, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  PackagesListQueryProvider,
  usePackagesListQueryData,
  usePackagesListQueryLoading,
} from './PackagesListQueryProvider'
import {packagesColumn} from './PackagesColumn'

const PackagesListPage = () => {
  const packages = usePackagesListQueryData()
  const isLoading = usePackagesListQueryLoading()

  const data = useMemo(() => packages, [packages])
  const columns = useMemo(() => packagesColumn, [])

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

const PackagesListWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Packages'>
        {intl.formatMessage({id: 'PACKAGES'})}
      </PageTitle>
      <PackagesListQueryProvider>
        <PackagesListPage />
      </PackagesListQueryProvider>
    </>
  )
}

export {PackagesListWrapper}
