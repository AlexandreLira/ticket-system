
import { createContext, useState, useEffect } from 'react'

import { auth, db } from '../services/firebaseConnection'
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged
 } from 'firebase/auth'
import { 
    collection, 
    doc, 
    getDocs, 
    setDoc, 
    serverTimestamp, 
} from 'firebase/firestore'

export const AuthContext = createContext({})

function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const usersCollectionRef = collection(db, 'users')

    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('currentUser')
            if(storageUser){
                setUser(JSON.parse(storageUser))
            }
            setLoading(false)
        }
        async function getUsers(){
            const data = await getDocs(usersCollectionRef)
            console.log(data)
        }
        loadStorage()
        getUsers()
      
    },[])

    async function signUp(email, password, name){
        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async value => {
            const uid = value.user.uid
            const newUser = doc(usersCollectionRef, uid)
            const data = {
                id: uid,
                name: name,
                email: value.user.email,
                avatarUrl: null,
                createAt: serverTimestamp(),
                updateAt: serverTimestamp()
            }

            await setDoc(newUser, data) 
            .then( () => {
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            })
        })
        .catch( error => {
            console.log(error)
        })
    }

    function storageUser(data){
        localStorage.setItem('currentUser', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider 
            value={{ 
                signed: !!user, 
                user, 
                loading, 
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider