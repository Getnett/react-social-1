import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
} from './profileConstants'

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  }
}
export function listenToSelectedUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  }
}
export function listenToUserPhotos(userPhotos) {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: userPhotos,
  }
}

export function listenToUserEvents(events) {
  return {
    type: LISTEN_TO_USER_EVENTS,
    payload: events,
  }
}
