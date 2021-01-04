import { Component } from 'react'
import { on, off } from '@/util/dom'
import OIcon from '@/components/o-icon'
import './style/fullscreen.scss'

const dom = document

function isVideoInFullscreen () {
  return !!(dom.fullscreenElement || dom.mozFullScreenElement || dom.webkitFullscreenElement || dom.fullScreen || dom.mozFullScreen || dom.webkitIsFullScreen)
}

export default class Fullscreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fullscreen: false
    }

    this.handleFullscreen = this.handleFullscreen.bind(this)
    this.fullscreenChange = this.fullscreenChange.bind(this)
  }

  componentDidMount () {
    on(dom, 'fullscreenchange', this.fullscreenChange, false)
    on(dom, 'mozfullscreenchange', this.fullscreenChange, false)
    on(dom, 'webkitfullscreenchange', this.fullscreenChange, false)
    on(dom, 'msfullscreenchange', this.fullscreenChange, false)
    this.setState({
      fullscreen: isVideoInFullscreen()
    })
  }

  componentWillUnmount () {
    off(dom, 'fullscreenchange', this.fullscreenChange, false)
    off(dom, 'mozfullscreenchange', this.fullscreenChange, false)
    off(dom, 'webkitfullscreenchange', this.fullscreenChange, false)
    off(dom, 'msfullscreenchange', this.fullscreenChange, false)
  }

  handleFullscreen () {
    if (this.state.fullscreen) {
      if (dom.exitFullscreen) {
        dom.exitFullscreen()
      } else if (dom.mozCancelFullScreen) {
        dom.mozCancelFullScreen()
      } else if (dom.webkitCancelFullScreen) {
        dom.webkitCancelFullScreen()
      } else if (dom.msExitFullscreen) {
        dom.msExitFullscreen()
      }
    } else {
      if (dom.body.requestFullscreen) {
        dom.body.requestFullscreen()
      } else if (dom.body.mozRequestFullScreen) {
        dom.body.mozRequestFullScreen()
      } else if (dom.body.webkitRequestFullScreen) {
        dom.body.webkitRequestFullScreen()
      } else if (dom.body.msRequestFullscreen) {
        dom.body.msRequestFullscreen()
      }
    }
  }

  fullscreenChange () {
    this.setState({
      fullscreen: !this.state.fullscreen
    })
  }

  render () {
    const { state } = this

    const iconProps = {
      className: 'icon',
      type: state.fullscreen ? 'iconfullscreen-shrink' : 'iconfullscreen-expand',
      onClick: this.handleFullscreen
    }

    return (
      <div className="fullscreen">
        <OIcon {...iconProps}/>
      </div>
    )
  }
}
