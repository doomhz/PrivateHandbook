import Firebase from 'firebase'
import config from '../../config.json'

export const FIREBASE_APP = Firebase.initializeApp(config.firebase)