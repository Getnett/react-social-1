import { combineReducers } from 'redux'
import eventReducer from '../../features/events/eventReducer'
// eslint-disable-next-line import/no-useless-path-segments
import testReducer from '../../app/sandbox/testReducer'

import modalReducer from '../common/modals/modalReducer'
import authReducer from '../../features/auth/authReducer'
import asyncReducer from '../async/asyncReducer'
import profileReducer from '../../features/profiles/profileReducer'

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer,
})

export default rootReducer
