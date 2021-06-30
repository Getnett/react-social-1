import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firebase/firebaseFirestore';

export function useFirestoreCollection({ query, data, deps }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncActionStart());
		const firestoreListener = query().onSnapshot(
			(snapshot) => {
				const docs = snapshot.docs.map((snapshotDoc) => dataFromSnapshot(snapshotDoc));
				data(docs);
				dispatch(asyncActionFinish());
			},

			(error) => {
				dispatch(asyncActionError(error));
			}
		);
		return () => {
			firestoreListener();
		};
	}, deps); // eslint-disable-line  react-hooks/exhaustive-deps
}
