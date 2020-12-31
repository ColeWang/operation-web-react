import { Component } from 'react'
import './style/side.scss'

export default class Side extends Component {
  static getDerivedStateFromProps (props) {
    if (props.inlineStatus) {
      return { setStyle: { width: '77px' } }
    } else {
      return { setStyle: { width: '238px' } }
    }
  }

  state = {
    setStyle: { width: '238px' }
  }

  render () {
    const { state } = this

    return (
      <div className="main-side" style={state.setStyle}>
        <div className="side">
          <div className="logo"></div>
        </div>
      </div>
    )
  }
}
