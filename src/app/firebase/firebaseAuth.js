import { toast } from 'react-toastify';
import firebase from '../config/firebaseConfig';
import { setUserProfileData } from './firebaseFirestore';

export function signInWithEmail(user) {
	return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
}
export function signOutFirebaseUser() {
	return firebase.auth().signOut();
}
export async function signUpUsers(user) {
	try {
		const userCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
		await userCredential.user.updateProfile({
			displayName: user.displayName,
		});
		await setUserProfileData(userCredential.user);
	} catch (error) {
		throw error;
	}
}

export async function socialLogin(selectedProvider) {
	let provider;

	if (selectedProvider === 'facebook') {
		provider = new firebase.auth.FacebookAuthProvider();
	}
	if (selectedProvider === 'google') {
		provider = new firebase.auth.GoogleAuthProvider();
	}

	try {
		const signInResult = await firebase.auth().signInWithPopup(provider);
		console.log('FB-LOGIN', signInResult);
		if (signInResult.additionalUserInfo.isNewUser) {
			await setUserProfileData(signInResult.user);
		}
	} catch (error) {
		toast.error(error.message);
	}
}

export function updateUserPassword(creds) {
	const currentUser = firebase.auth().currentUser;
	return currentUser.updatePassword(creds.newPassword);
}
