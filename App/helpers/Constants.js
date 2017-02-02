export const TYPE_DO = "DO"
export const TYPE_DECIDE = "DECIDE"
export const TYPE_DELEGATE = "DELEGATE"
export const TYPE_DELETE = "DELETE"
export const STORAGE_KEY_NAME = "todos"
export const AUTH_KEY_NAME = "user_data"

import Firebase from 'firebase'
import config from '../../config.json'

export const APP = Firebase.initializeApp(config.firebase)