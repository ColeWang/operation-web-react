import { Component } from 'react'
import ErrorContent from './ErrorContent'
import error401 from '@/assets/images/error-page/error-401.svg'

export default class Error401 extends Component {
  render () {
    const errorProps = {
      code: 401,
      desc: 'Oh~~您没有浏览这个页面的权限~',
      src: error401
    }

    return (
      <ErrorContent {...errorProps}/>
    )
  }
}
