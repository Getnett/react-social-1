import cuid from 'cuid'
import firebase from '../config/firebaseConfig'
const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined
  const data = snapshot.data()

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate()
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  }
}

export function listenToEventsFirestore() {
  return db.collection('events').orderBy('date')
}

export function listenToEventFirestore(eventId) {
  return db.collection('events').doc(eventId)
}

export function addEventToFirestore(event) {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Abel',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'Abel',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    }),
  })
}

export function updateEventInFirestore(event) {
  return db.collection('events').doc(event.id).update(event)
}
export function deleteEventInFirestore(eventId) {
  return db.collection('events').doc(eventId).delete()
}

export function cancelEventInFirestore(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  })
}

export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId)
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser

  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      })
    }
    return await db.collection('users').doc(user.uid).update(profile)
  } catch (error) {
    throw error
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser
  const userDocRef = db.collection('users').doc(user.uid)

  try {
    const userDoc = await userDocRef.get()
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      filename,
      url: downloadURL,
    })
  } catch (error) {
    throw error
  }
}

export function getUserPhotos(userId) {
  return db.collection('users').doc(userId).collection('photos')
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser

  await db.collection('users').doc(user.uid).update({
    photoURL: photo.url,
  })

  return user.updateProfile({
    photoURL: photo.url,
  })
}

export function deletePhotoFromCollection(photoId) {
  const userId = firebase.auth().currentUser.uid
  return db
    .collection('users')
    .doc(userId)
    .collection('photos')
    .doc(photoId)
    .delete()
}
