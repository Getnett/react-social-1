const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

export function openModal(payload) {
  return {
    type: OPEN_MODAL,
    payload,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

const initialState = null
export default function modalReducer(
  state = initialState,
  { type, payload: { modalType, modalProps } }
) {
  switch (type) {
    case OPEN_MODAL:
      return {
        modalType,
        modalProps,
      }

    case CLOSE_MODAL:
      return null
    default:
      return state
  }
}
