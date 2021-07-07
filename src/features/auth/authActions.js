import { SIGN_IN_USER, SIGN_OUT_USER } from './authActionTypes';
import firebase from '../../app/config/firebaseConfig';
import { APP_LOADED } from '../../app/async/asyncReducer';
export function signInUser(user) {
	return {
		type: SIGN_IN_USER,
		payload: user,
	};
}

export function signOutUser() {
	return {
		type: SIGN_OUT_USER,
	};
}

export function verifyAuth() {
	return function (dispatch) {
		return firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dispatch(signInUser(user));
				dispatch({ type: APP_LOADED });
			} else {
				dispatch(signOutUser());
				dispatch({ type: APP_LOADED });
			}
		});
	};
}
