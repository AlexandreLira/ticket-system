import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/Header/header"
import './dashboard.css'
import Title from "../../components/Title/title"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { 
    collection,
    getDocs,
    orderBy,
    query,
    Timestamp
 } from 'firebase/firestore'
import { db } from "../../services/firebaseConnection"
import { toDate, format } from 'date-fns'

function RenderTable({item}) {
    
    const date = format(item.createdAt.toDate(), 'dd/MM/yyyy')
    const statusColor = ['#3583f6', '#F6a935', '#5fd204']
    const status = ["Aberto", "Progresso", "Atendido"]
    const matters = ["Suporte", "Visita ternica", "Financeiro"]

    return (
        <tr>
            <td data-label="Cliente">{item.customer}</td>
            <td data-label="Assunto">{matters[item.matters]}</td>
            <td data-label="Status">
                <span
                    className="badge"
                    style={{ backgroundColor: statusColor[item.status] }}
                >
                    {status[item.status]}
                </span>
            </td>
            <td data-label="Cadastrado em">{date}</td>
            <td data-label="#">
                <button className="action" style={{ backgroundColor: '#3583f6' }}>
                    <FiSearch color="#FFF" size={17} />
                </button>
                <button className="action" style={{ backgroundColor: '#F6a935' }}>
                    <FiEdit2 color="#FFF" size={17} />
                </button>
            </td>
        </tr>
    )
}


export default function Dashboard() {
    const [tickets, setTickets] = useState([])
    const { logout } = useContext(AuthContext)

    
    useEffect(() => {
        async function getTickets(){
            const ticketsRef = collection(db, 'tickets')
            const searchQuery = query(ticketsRef, orderBy('createdAt', 'desc')) 
            const querySnapshot = await getDocs(searchQuery)
            let ticketsList = []
            querySnapshot.forEach(doc => {
                const data  = doc.data()
                ticketsList.push(data)
                console.log(data)
            })
            setTickets(ticketsList)
        }
        getTickets()
        
    },[])

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
                </Title>

                {tickets.length === 0 ?
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>
                        <Link to="/new">
                            <FiPlus size={25} color="#FFF" />
                            Novo chamado
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
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
                                {tickets.map(item => (
                                    <RenderTable item={item}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}