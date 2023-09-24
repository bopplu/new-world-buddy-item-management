// Import the functions you need from the SDKs you need
// import '@firebase/app'
// import '@firebase/firestore'
import {onUnmounted, ref} from 'vue'
import {initializeApp} from "firebase/app"
import {getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from "firebase/firestore"
import {
    getAuth,
    getRedirectResult,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
    type User,
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCzMVjUW48VRTYSZdD4Q0aZ8oCy57oOR80',
    authDomain: 'new-world-buddy.firebaseapp.com',
    projectId: 'new-world-buddy',
    storageBucket: 'new-world-buddy.appspot.com',
    messagingSenderId: '743241756745',
    appId: '1:743241756745:web:437237b8b22ce104b70f98',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
const auth = getAuth()
const currentUser = ref<User | null>(null)

// export const signIn = () => signInWithRedirect(auth, provider)
export const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
    currentUser.value = result?.user
}
export const isLoggedIn = async () => {
    return !!auth.currentUser
}

const db = getFirestore(app)
export const itemCollection = collection(db, 'items')
export const categoryCollection = collection(db, 'categories')

export interface Item {
    id?: string
    name: string
    category: string
    tier: number | null
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string
    quantity: number | null
}

export const addItem = (item: Item) => addDoc( itemCollection, item)
export const deleteItem = (id: string) => deleteDoc(doc(itemCollection, id))
export const updateItem = (id: string, item: Item) => updateDoc(doc(itemCollection, id), {...item})

export const useLoadItems = () => {
    const items = ref<Item[]>([])
    const close = onSnapshot(itemCollection, (snapshot: any) => {
        items.value = snapshot.docs.map((item: any) => ({
            id: item.id,
            ...item.data(),
        }))
    })
    onUnmounted(close)
    return items
}
