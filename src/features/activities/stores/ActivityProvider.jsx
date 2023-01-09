import {useMemberInfoQueryData} from '@/features/members/stores/MemberInfoQueryProvider'
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import {
  getActivitySummaryTotal,
  getActivitySummaryCount,
  getAllActivitySummaryTotal,
  getAllActivitySummaryCount,
} from '../api'

const ActivityContext = createContext({
  activitySummaryTotal: undefined,
  activitySummaryCount: undefined,
  activitySummary: undefined,
  setActivitySummary: (any) => {},
})

const useActivity = () => {
  return useContext(ActivityContext)
}

const ActivityProvider = ({children}) => {
  const member = useMemberInfoQueryData()
  const didRequestSummaryTotal = useRef(false)
  const didRequestSummaryCount = useRef(false)
  const [activitySummaryTotal, setActivitySummaryTotal] = useState(undefined)
  const [activitySummaryCount, setActivitySummaryCount] = useState(undefined)
  const [activitySummary, setActivitySummary] = useState(undefined)

  useEffect(() => {
    const getActivitySummaryWithTotal = async () => {
      try {
        if (!didRequestSummaryTotal.current) {
          const data = await getActivitySummaryTotal(member.accountId)
          if (data.length > 0) {
            setActivitySummaryTotal(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryTotal.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryTotal.current = true)
    }

    const getActivitySummaryWithCount = async () => {
      try {
        if (!didRequestSummaryCount.current) {
          const data = await getActivitySummaryCount(member.accountId)
          if (data.length > 0) {
            setActivitySummaryCount(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryCount.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryCount.current = true)
    }

    if (Object.keys(member).length > 0) {
      getActivitySummaryWithTotal()
      getActivitySummaryWithCount()
    }
  }, [member])

  useEffect(() => {
    const getAllActivitySummaryWithTotal = async () => {
      try {
        if (!didRequestSummaryTotal.current) {
          const data = await getAllActivitySummaryTotal()
          if (data.length > 0) {
            setActivitySummaryTotal(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryTotal.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryTotal.current = true)
    }

    const getAllActivitySummaryWithCount = async () => {
      try {
        if (!didRequestSummaryCount.current) {
          const data = await getAllActivitySummaryCount()
          if (data.length > 0) {
            setActivitySummaryCount(data)
          }
        }
      } catch (error) {
        if (!didRequestSummaryCount.current) {
          toast.error('Unable to fetch Activity Information')
        }
      }

      return () => (didRequestSummaryCount.current = true)
    }

    getAllActivitySummaryWithTotal()
    getAllActivitySummaryWithCount()
  }, [])

  return (
    <ActivityContext.Provider
      value={{
        activitySummaryTotal,
        activitySummaryCount,
        activitySummary,
        setActivitySummary,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export {ActivityProvider, useActivity}
