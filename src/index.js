import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import 'react-datepicker/dist/react-datepicker.css'
document.title = import.meta.env.VITE_APP_NAME || 'Customer app panel'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
