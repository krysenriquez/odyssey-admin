import {Suspense} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '@/components/assets/_utils'

export const SuspensedView = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      0: baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}
