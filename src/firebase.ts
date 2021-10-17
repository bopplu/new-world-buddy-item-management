// Import the functions you need from the SDKs you need
// import '@firebase/app'
// import '@firebase/firestore'
import { onUnmounted, ref } from 'vue'
import firebase from 'firebase/compat'
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  User,
} from 'firebase/auth'
import initializeApp = firebase.initializeApp
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'new-world-buddy.firebaseapp.com',
  projectId: 'new-world-buddy',
  storageBucket: 'new-world-buddy.appspot.com',
  messagingSenderId: '743241756745',
  appId: process.env.APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
const auth = getAuth()
const currentUser = ref<User | undefined>(undefined)

export const signIn = () => signInWithRedirect(auth, provider)
export const isLoggedIn = async () => {
  await getRedirectResult(auth).then((result) => {
    currentUser.value = result?.user
  })
  return !!currentUser.value
}

const db = app.firestore()
export const itemCollection = db.collection('items')
export const categoryCollection = db.collection('categories')

export interface Item {
  id?: string
  name: string
  category: string
  tier: number
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: string
  quantity: number
}

export const addItem = (item: Item) => itemCollection.add(item)
export const deleteItem = (id: string) => itemCollection.doc(id).delete()
export const updateItem = (id: string, item: Item) =>
  itemCollection.doc(id).update(item)

export const useLoadItems = () => {
  const items = ref<Item[]>([])
  const close = itemCollection.onSnapshot((snapshot: any) => {
    items.value = snapshot.docs.map((item: any) => ({
      id: item.id,
      ...item.data(),
    }))
  })
  onUnmounted(close)
  return items
}
