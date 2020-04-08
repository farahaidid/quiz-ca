// Imports
import firebase from 'firebase/app'
import "firebase/firebase-firestore"

import config from "./config.firebase"

// Initializing app
const app = firebase.initializeApp(config)


// Initialing database
const database = app.firestore()

// Exporting database
export default database

// Exporting collections
export const ROOMS = database.collection('Rooms')
export const USERS = docId => ROOMS.doc(docId).collection("Users")
export const QUESTIONS = docId => ROOMS.doc(docId).collection("Questions")