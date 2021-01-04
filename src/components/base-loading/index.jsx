import { Component } from 'react'
import BaseLoading from './BaseLoading'

function loading (Loading, target) {
  return class PP extends Component {
    componentDidMount () {
      const loading = this.refs.proc
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
        <Loading ref="proc"/>
      )
    }
  }
}

export {
  BaseLoading
}

export default loading
