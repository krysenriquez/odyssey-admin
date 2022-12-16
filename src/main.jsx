import axios from 'axios'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Styles
import './assets/sass/plugins.scss'
import './assets/sass/style.scss'
import './assets/sass/style.react.scss'

import {setupAxios} from '@/features/auth/utils/AuthUtils'
import {CustomI18nProvider} from '@/providers/i18n/CustomI18nProvider'
import {ThemeModeProvider} from '@/providers/ThemeModeProvider'
import {AuthProvider} from '@/providers/AuthProvider'
import {AppRoutes} from '@/routes'

setupAxios(axios)
const queryClient = new QueryClient()
const container = document.getElementById('root')

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <CustomI18nProvider>
      <ThemeModeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeModeProvider>
    </CustomI18nProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
