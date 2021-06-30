import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: 'AIzaSyDiRmM0Zhh9do7rekE00QHRGx8xAs-LUz4',
	authDomain: 'eventsapp-91e94.firebaseapp.com',
	projectId: 'eventsapp-91e94',
	storageBucket: 'eventsapp-91e94.appspot.com',
	messagingSenderId: '472366790205',
	appId: '1:472366790205:web:f77fa0894582c711d1dc54',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
