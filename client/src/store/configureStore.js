import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import tasksReducer from '../reducers/tasks'
const configureStore=()=> {
    const store=createStore(combineReducers({
        tasks:tasksReducer,
        labels:labelsReducer
    }),applyMiddleware(thunk))
}

export default configureStore