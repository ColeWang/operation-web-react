import { Component } from 'react'
import BaseLoading from './BaseLoading'

function loading (Loading, target) {
  return class PP extends Component {
    constructor (props) {
      super(props)

      this.proc = this.proc.bind(this)
    }

    proc (loading) {
      target.onShow = this.onShow.bind(loading)
      target.onHide = this.onHide.bind(loading)
      target.isVisible = this.isVisible.bind(loading)
    }

    onShow (callback) {
      this.setState({
        visible: true
      }, () => {
        if (callback && typeof callback === 'function') {
          callback()
        }
      })
    }

    onHide (callback) {
      this.setState({
        visible: false
      }, () => {
        if (callback && typeof callback === 'function') {
          callback()
        }
      })
    }

    isVisible () {
      return this.state.visible
    }

    render () {
      return (
        <Loading ref={this.proc}/>
      )
    }
  }
}

export {
  BaseLoading
}

export default loading
