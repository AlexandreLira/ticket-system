
import { createContext, useState, useEffect } from 'react'

import { toast } from 'react-toastify';


import { auth, db } from '../services/firebaseConnection'
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
 } from 'firebase/auth'
import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    serverTimestamp, 
} from 'firebase/firestore'



export const AuthContext = createContext({})

function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showPostModal, setShowPostModal] = useState(false)
    const [itemSelected, setItemSelected] = useState([])
    

    const usersCollectionRef = collection(db, 'users')

    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('systemUser')
            if(storageUser){
                setUser(JSON.parse(storageUser))
            }
            setLoading(false)
        }
        loadStorage()
      
    },[])

    async function register(email, password, name){
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
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }

            await setDoc(newUser, data) 
            .then( () => {
                setUser(data)
                storageUser(data)
                toast.success('Seja bem vindo!')
                setLoadingAuth(false)
            })
        })
        .catch( error => {
            setLoadingAuth(false)
            toast.error('Ops! algo deu errado')
        })
    }
    async function login(email, password){
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then(async value => {
            const uid = value.user.uid
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data())
                storageUser(docSnap.data())
                toast.success('Que bom te ver por aqui!')
                setLoadingAuth(false)
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        })
        .catch( error => {
            toast.error('Ops! algo deu errado')
            console.log(error)
        })
    }

    async function logout(){
        await signOut(auth)
        localStorage.removeItem('systemUser')
        setUser(null)
    } 

    function storageUser(data){
        localStorage.setItem('systemUser', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider 
            value={{ 
                signed: !!user, 
                user, 
                loading, 
                loadingAuth,
                showPostModal, 
                itemSelected, 
                register,
                login,
                logout,
                storageUser,
                setUser,
                setShowPostModal,
                setItemSelected
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider