import { toast } from 'react-toastify'
import firebase from '../config/firebaseConfig'
import { setUserProfileData } from './firebaseFirestore'

export function signInWithEmail(user) {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
}
export function signOutFirebaseUser() {
  return firebase.auth().signOut()
}
export async function signUpUsers(user) {
  const userCredential = await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
  await userCredential.user.updateProfile({
    displayName: user.displayName,
  })
  await setUserProfileData(userCredential.user)
}

export async function socialLogin(selectedProvider) {
  let provider

  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider()
  }
  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider()
  }

  try {
    const signInResult = await firebase.auth().signInWithPopup(provider)

    if (signInResult.additionalUserInfo.isNewUser) {
      await setUserProfileData(signInResult.user)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export function updateUserPassword(creds) {
  const { currentUser } = firebase.auth()
  return currentUser.updatePassword(creds.newPassword)
}

export function uploadToFirebaseStoarge(file, filename) {
  const user = firebase.auth().currentUser
  const stoargeRef = firebase.storage().ref()
  return stoargeRef.child(`${user.uid}/user_images/${filename}`).put(file)
}

export function deleteFromFirebaseStoarge(filename) {
  const userId = firebase.auth().currentUser.uid
  const stoargeRef = firebase.storage().ref()
  const photoRef = stoargeRef.child(`${userId}/user_images/${filename}`)
  return photoRef.delete()
}
