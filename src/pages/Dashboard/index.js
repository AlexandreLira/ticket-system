import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard(){
    const { logout } = useContext(AuthContext)
    return(
        <div>
            <h1>PAGINA DASHBOARD</h1>
            <button onClick={logout}>sair</button>
        </div>
    )
}