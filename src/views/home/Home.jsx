import { Component } from 'react'
import { Button } from 'antd'
import { pendingEffect } from '@/util/pendingEffect'
import './home.scss'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
    this.onSubmit = pendingEffect(this, this.submit, 'loading')
  }

  submit () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  render () {
    const { state } = this

    return (
      <div className="home">
        <Button onClick={this.onSubmit} loading={state.loading}>Home</Button>
      </div>
    )
  }
}
