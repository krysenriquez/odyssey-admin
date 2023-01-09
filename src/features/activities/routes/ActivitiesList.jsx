import {ActivitiesListQueryProvider} from '../stores/ActivitiesListQueryProvider'
import {ActivitiesListTable} from '../components/ActivitiesList/ActivitiesListTable'

export const ActivitiesList = () => {
  return (
    <>
      <ActivitiesListQueryProvider>
        <ActivitiesListTable />
      </ActivitiesListQueryProvider>
    </>
  )
}
