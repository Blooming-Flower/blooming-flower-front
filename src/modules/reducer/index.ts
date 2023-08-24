import { combineReducers } from 'redux'
import layOutReducer from './layout'

const rootReducer = combineReducers({
	layOutReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
