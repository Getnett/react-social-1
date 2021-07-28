/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// eslint-disable-next-line import/no-useless-path-segments
import rootReducer from '../store/rootReducer'
import { verifyAuth } from '../../features/auth/authActions'

export default function store() {
  const reduxStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  reduxStore.dispatch(verifyAuth())
  return reduxStore
}
