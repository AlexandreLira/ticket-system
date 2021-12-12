import { useState, useContext } from 'react'

import Title from '../../components/Title/title'
import Header from '../../components/Header/header'
import './profile.css'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from "../../assets/avatar.png"

import { AuthContext } from "../../contexts/auth"

function Profile(){
    const { user, logout } = useContext(AuthContext)

    const [ name,      setName      ] = useState(user?.name)
    const [ email,     setEmail     ] = useState(user?.email)
    const [ avatarUrl, setAvatarUrl ] = useState(user?.avatarUrl)
    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input type="file" accept="image/*" />
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

                        <button>Salvar</button>

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