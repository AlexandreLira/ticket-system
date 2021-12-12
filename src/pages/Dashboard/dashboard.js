import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/Header/header"
export default function Dashboard(){
    const { logout } = useContext(AuthContext)
    return(
        <div>
            <Header/>
            <h1>PAGINA DASHBOARD</h1>
            <button onClick={logout}>sair</button>
        </div>
    )
}