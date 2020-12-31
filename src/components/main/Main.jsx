import { Component } from 'react'
// import PrivateRoute from '@/router'
import MainHeader from './header'
import MainSide from './side'
import MainContent from './content'
import './style/main.scss'

// const Home = lazy(() => import('@/views/home'))

export default class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inlineStatus: false
    }

    this.setInlineStatus = this.setInlineStatus.bind(this)
  }

  setInlineStatus (value) {
    this.setState({
      inlineStatus: value
    })
  }

  render () {
    const { state } = this

    return (
      <div className="main">
        <MainSide inlineStatus={state.inlineStatus}/>
        <div className="prime">
          <MainHeader inlineStatus={state.inlineStatus} setInlineStatus={this.setInlineStatus}/>
          <div className="content">
            <MainContent/>
          </div>
        </div>
      </div>
    )
  }
}
