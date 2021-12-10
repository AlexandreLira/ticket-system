import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import logo from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth'
function SignIn() {
    const [ email,    setEmail ]    = useState('')
    const [ password, setPassword ] = useState('')

    const { login, loadingAuth } = useContext(AuthContext)

    function handleSubmit(event){
        //evento para não atualizar a pagina
        event.preventDefault();
        if(email !== '' && password !== ''){
            login(email, password)
        }
    }
    return(
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="logo"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input 
                        type="email"
                        placeholder="email@email.com" 
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="********"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                    
                    <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn