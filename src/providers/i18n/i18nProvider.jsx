import {useLang} from './CustomI18nProvider'
import {IntlProvider} from 'react-intl'

import enMessages from './strings/en.json'

const allMessages = {
  en: enMessages,
}

const I18nProvider = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
