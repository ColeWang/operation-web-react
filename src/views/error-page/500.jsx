import { Component } from 'react'
import ErrorContent from './ErrorContent'
import error500 from '@/assets/images/error-page/error-500.svg'

export default class Error500 extends Component {
  render () {
    const errorProps = {
      code: 500,
      desc: 'Oh~~鬼知道服务器经历了什么~',
      src: error500
    }

    return (
      <ErrorContent {...errorProps}/>
    )
  }
}
