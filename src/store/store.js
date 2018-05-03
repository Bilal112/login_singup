import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import {auth} from './reducers/index'
const middleware = applyMiddleware(createLogger(), thunk)

let RootReducer = combineReducers({
auth,
})

const store = createStore(
    RootReducer,
    middleware,
)

store.subscribe(() => { console.log(store.getState()) })

export default store