import './index.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'sweetalert2/src/sweetalert2.scss'

import { persistor, store } from './store/store.ts'

import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n.ts'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>
)
