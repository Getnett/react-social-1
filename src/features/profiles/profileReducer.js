import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
} from './profileConstants'

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  userPhotos: [],
  profileEvents: [],
}

export default function profileReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      }
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload,
      }
    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        userPhotos: payload,
      }
    case LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: payload,
      }
    default:
      return state
  }
}
