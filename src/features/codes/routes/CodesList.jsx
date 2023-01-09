import {CodesListQueryProvider} from '../stores/CodesListQueryProvider'
import {CodesListTable} from '../components/CodesList/CodesListTable'

export const CodesList = () => {
  return (
    <>
      <CodesListQueryProvider>
        <CodesListTable />
      </CodesListQueryProvider>
    </>
  )
}
