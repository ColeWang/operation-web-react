import { Component } from 'react'
import { baseLoading } from '@/App'
import { Button } from 'antd'
import './home.scss'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    baseLoading.onShow()
    setTimeout(() => {
      baseLoading.onHide()
    }, 1000)
  }

  render () {
    return (
      <div className="home">
        <Button onClick={this.handleClick}>Home</Button>
      </div>
    )
  }
}
