import { Component } from 'react'
import ErrorContent from './ErrorContent'
import error404 from '@/assets/images/error-page/error-404.svg'

export default class Error404 extends Component {
  render () {
    const errorProps = {
      code: 404,
      desc: 'Oh~~您的页面好像飞走了~',
      src: error404
    }

    return (
      <ErrorContent {...errorProps}/>
    )
  }
}
