import { toast } from 'react-toastify'
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncReducer'
import { delay } from '../util/util'

const INCREMENT_COUNTER = 'INCREMENT_COUNTER '
const DECREMENT_COUNTER = 'DECREMENT_COUNTER '

export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      await delay(1000)

      dispatch({ type: INCREMENT_COUNTER, payload: amount })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }
}

export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart())
    try {
      await delay(1000)
      dispatch({ type: DECREMENT_COUNTER, payload: amount })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }
}

const initialState = {
  data: 45,
}

export default function testReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + payload,
      }
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - payload,
      }
    default:
      return state
  }
}
