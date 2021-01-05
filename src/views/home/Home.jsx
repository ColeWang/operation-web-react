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
  }

  submit () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 5000)
    })
  }

  render () {
    const { state } = this

    // @todo 待完善
    const onSubmit = pendingEffect(this, this.submit.bind(this))

    return (
      <div className="home">
        <Button onClick={onSubmit} loading={state.loading}>Home</Button>
      </div>
    )
  }
}
