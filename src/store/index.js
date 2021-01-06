import { createStore, combineReducers } from 'redux'
import mainReducer from './reducer/mainReducer'

const rootReducer = combineReducers({
  mainReducer
})

const store = createStore(rootReducer)

export default store
