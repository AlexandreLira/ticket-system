import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/Header/header"
import './dashboard.css'
import Title from "../../components/Title/title"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
export default function Dashboard(){
    const [tickets, setTickets] = useState([1])
    const { logout } = useContext(AuthContext)
    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25}/>
                </Title>

                {tickets.length === 0 ? 
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>
                        <Link to="/new">
                            <FiPlus size={25} color="#FFF"/>
                            Novo chamado
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF"/>
                            Novo chamado
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">alexandre</td>
                                    <td data-label="Assunto">alexandre</td>
                                    <td data-label="Status">
                                        <span 
                                            className="badge" 
                                            style={{backgroundColor: '#5fd204'}}
                                        >Em Aberto</span>
                                    </td>
                                    <td data-label="Cadastrado em">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color="#FFF" size={17}/>
                                        </button>
                                        <button className="action" style={{backgroundColor: '#F6a935'}}>
                                            <FiEdit2 color="#FFF" size={17}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                }
              
             
            </div>
        </div>
    )
}