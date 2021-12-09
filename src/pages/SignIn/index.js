import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import logo from '../../assets/logo.png'
function SignIn() {
    const [ email,    setEmail ]    = useState('')
    const [ password, setPassword ] = useState('')

    function handleSubmit(event){
        //evento para não atualizar a pagina
        event.preventDefault();
        alert('CLICOU')
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
                    <button type="submit">Acessar</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn