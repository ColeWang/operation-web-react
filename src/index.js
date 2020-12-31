import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import reportWebVitals from '@/reportWebVitals'
import '@/assets/css/reset.css'

if (process.env.REACT_APP_ENV === 'development') require('@/mock')

const Root = (<App/>)
const rootElement = document.getElementById('root')
ReactDOM.render(Root, rootElement)
reportWebVitals()
