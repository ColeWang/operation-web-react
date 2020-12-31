import { Component } from 'react'
import observer from '@/common/observer'

export const BASE_LOADING = Symbol()

export default class BaseLoading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    observer.addListener(BASE_LOADING, (value) => {
      this.setState({
        visible: value
      })
    })
  }

  componentWillUnmount () {
    observer.removeListener(BASE_LOADING)
  }

  render () {
    return (<div>loading</div>)
  }
}
