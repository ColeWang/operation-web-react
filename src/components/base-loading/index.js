import BaseLoading, { BASE_LOADING } from './BaseLoading'
import observer from '@/common/observer'

class Loading {
  show () {
    observer.emit(BASE_LOADING, true)
  }

  hide () {
    observer.emit(BASE_LOADING, false)
  }
}

export {
  BaseLoading
}

export default Loading
