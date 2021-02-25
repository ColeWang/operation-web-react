import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from '@/App'
import store from '@/store'
import reportWebVitals from '@/reportWebVitals'
import '@/assets/css/reset.css'

if (process.env.REACT_APP_ENV === 'development') require('@/mock')

const Root = (
  <Provider store={store}>
    <App/>
  </Provider>
)
const rootElement = document.getElementById('root')
ReactDOM.render(Root, rootElement)
reportWebVitals()
