import { Component } from 'react'
import { Button } from 'antd'
import { pendingEffect } from '@/util/pendingEffect'
import './home.scss'

export default class Home extends Component {
  state = {
    loading: false
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

    const onSubmit = pendingEffect(this, this.submit.bind(this))

    return (
      <div className="home">
        <Button onClick={onSubmit} loading={state.loading}>Home</Button>
      </div>
    )
  }
}
