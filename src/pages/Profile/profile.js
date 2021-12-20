import { useState, useContext } from 'react'
import { db, storage } from '../../services/firebaseConnection'
import {
    doc,
    serverTimestamp,
    setDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import Title from '../../components/Title/title'
import Header from '../../components/Header/header'
import './profile.css'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from "../../assets/avatar.png"
import { toast } from 'react-toastify'
import { AuthContext } from "../../contexts/auth"

function Profile(){
    const { user, logout, setUser, storageUser } = useContext(AuthContext)

    const [ name,      setName      ] = useState(user?.name)
    const [ avatarUrl, setAvatarUrl ] = useState(user?.avatarUrl)
    const [ newAvatarUrl, setNewAvatarUrl ] = useState(user?.avatarUrl)
    const [progress, setProgress] = useState(0)
    const email =  user?.email
    const userRef = doc(db, "users", user.id)

    async function handleSave(event){
        event.preventDefault()
        
        if(name !== user.name && newAvatarUrl === user.avatarUrl) {
            await setDoc(userRef, {
                name: name, 
                updateAt: serverTimestamp()
            }, 
            {
                merge: true
            })
            .then( value => {
                let data = {
                    ...user,
                    name: name
                }
                setUser(data)
                storageUser(data)
                toast.success('Perfil editado com sucesso!')
            }).catch( error => {
                toast.warning('Ops! algo deu errado')
            })
        }
        else if(newAvatarUrl !== user.avatarUrl && name !== user.name){
            handleUpload(newAvatarUrl)
        }

    }

    function handleFile(event){
        const image = event.target.files[0]
        console.log(image)
        if(image){
           if(image.type === 'image/jpeg' || image.type === 'image/png'){
               setNewAvatarUrl(image)
               setAvatarUrl(URL.createObjectURL(image))
               console.log(URL.createObjectURL(image))
           }
        }
    }

    async function handleUpload(image){
        if(!image) return
        const storageRef = ref(storage, `images/${user.id}/${newAvatarUrl.name}`)
        const uploadTask = uploadBytesResumable(storageRef, newAvatarUrl)
        uploadTask.on("state_changed", snapshot => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(prog)
        },
        () => {
            toast.error('errro')
            setProgress(0)
        },
        () => {
            toast.success('sucess')
            setProgress(0)
            getDownloadURL(uploadTask.snapshot.ref)
            .then(async url => {
                await setDoc(userRef, {
                    avatarUrl: url,
                    name: name,
                    updateAt: serverTimestamp()
                }, 
                {merge: true})
                .then(() => {
                    let data = {
                        ...user,
                        name: name,
                        avatarUrl: url
                    }
                    setUser(data)
                    storageUser(data)
                })
            })
        })

    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFile}    
                            />
                            <img 
                                src={avatarUrl === null ? avatar : avatarUrl} 
                                width="250" 
                                height="250" 
                                alt="Foto do perfil do usuario"
                            />
                        </label>

                        <label>Nome</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={ event => setName(event.target.value)}
                        />

                        <label>Email</label>
                        <input 
                            type="text" 
                            value={email}
                            disabled={true}
                        />

                        <button>{progress > 1 ? `Salvando ${progress}%` : 'Salvar' }</button>

                    </form>
                </div>

                <div className="container">
                    <button 
                        className="logout-btn"
                        onClick={logout}
                    >Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Profile