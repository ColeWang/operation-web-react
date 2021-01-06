import { MAIN_INLINE_STATUS } from '../action/mainAction'

const mainData = {
  inlineStatus: false
}

function mainReducer (state = mainData, action) {
  switch (action.type) {
    case MAIN_INLINE_STATUS:
      return {
        inlineStatus: action.payload
      }
    default:
      return state
  }
}

export default mainReducer
