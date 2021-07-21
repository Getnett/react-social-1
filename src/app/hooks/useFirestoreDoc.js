import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncReducer'
import { dataFromSnapshot } from '../firebase/firebaseFirestore'

export function useFirestoreDoc({ query, data, deps, shouldExecute = true }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!shouldExecute) return
    dispatch(asyncActionStart())
    const firestoreListener = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: 'Not-Found',
              message: 'Couldnt find the page',
            })
          )
          return
        }
        data(dataFromSnapshot(snapshot))
        dispatch(asyncActionFinish())
      },

      (error) => {
        dispatch(asyncActionError(error))
      }
    )
    return () => {
      firestoreListener()
    }
  }, deps) // eslint-disable-line  react-hooks/exhaustive-deps
}
