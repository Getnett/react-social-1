/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-catch */
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

export function listenToEventsFirestore(filter) {
  const user = firebase.auth().currentUser
  const unfilteredEvent = db.collection('events').orderBy('date')
  switch (filter.get('filter')) {
    case 'isGoing':
      return unfilteredEvent
        .where('attendeesId', 'array-contains', user.uid)
        .where('date', '>=', filter.get('startDate'))

    case 'isHosting':
      return unfilteredEvent
        .where('hostUid', '==', user.uid)
        .where('date', '>=', filter.get('startDate'))

    default:
      return unfilteredEvent.where('date', '>=', filter.get('startDate'))
  }
}

export function listenToEventFirestore(eventId) {
  return db.collection('events').doc(eventId)
}

export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser
  return db.collection('events').add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }),
    attendeesId: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export function addUserAttendanceToEvent(event) {
  const user = firebase.auth().currentUser
  return db
    .collection('events')
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
      attendeesId: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
}

export async function cancelUserEventAttendance(event) {
  const user = firebase.auth().currentUser

  try {
    const eventDoc = await db.collection('events').doc(event.id).get()
    return db
      .collection('events')
      .doc(event.id)
      .update({
        attendees: eventDoc
          .doc()
          .attendees.filter((attendee) => attendee.id !== user.uid),
        attendeesId: firebase.firestore.FieldValue.arrayRemove(user.uid),
      })
  } catch (error) {
    throw error
  }
}

export function getUserEventsQuery(activeTab, userUid) {
  const unfilteredEvents = db.collection('events')
  const today = new Date()

  switch (activeTab) {
    case 1:
      console.log('WHY-ACT', activeTab)

      unfilteredEvents
        .where('attendeesId', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          console.log('DATA', snapshot)
        })

      return unfilteredEvents
        .where('attendeesId', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc')

    case 2:
      return unfilteredEvents.where('hostUid', '==', userUid).orderBy('date')

    default:
      return unfilteredEvents
        .where('attendeesId', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date')
  }
}
