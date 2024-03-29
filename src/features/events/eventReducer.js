import {
  CLEAR_CHAT_COMMENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHATS,
  UPDATE_EVENT,
} from './eventConstants'

const initialState = {
  events: [],
  comments: [],
}

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      }

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== payload.id),
          payload,
        ],
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((event) => event.id !== payload)],
      }
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      }
    case LISTEN_TO_EVENT_CHATS:
      return {
        ...state,
        comments: payload,
      }
    case CLEAR_CHAT_COMMENTS:
      return {
        ...state,
        comments: [],
      }
    default:
      return state
  }
}
