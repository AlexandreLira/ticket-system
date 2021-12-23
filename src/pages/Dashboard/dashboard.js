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
    limit,
    orderBy,
    query,
    startAfter,
    where
} from 'firebase/firestore'
import { db } from "../../services/firebaseConnection"
import { format } from 'date-fns'

function RenderTable({ item, index }) {

    const date = format(item.createdAt.toDate(), 'dd/MM/yyyy')
    const statusColor = ['#3583f6', '#F6a935', '#5fd204']
    const status = ["Aberto", "Progresso", "Atendido"]
    const matters = ["Suporte", "Visita ternica", "Financeiro"]
    return (
        <tr key={index.toString()}>
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
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState(false)
    const { user } = useContext(AuthContext)

    const ticketsRef = collection(db, 'tickets')

    useEffect(() => {
        const firstSearchQuery = query(
            ticketsRef,
            where('createdBy', '==', user.id),
            orderBy('createdAt', 'desc'),
            limit(3)
        )

        getTickets(firstSearchQuery)
    }, [])

    async function getTickets(query) {
        const snapshot = await getDocs(query)
        const isCollectionEmpty = snapshot.size === 0
        if(!isCollectionEmpty){
            let ticketsList = []
            snapshot.forEach(doc => {
                const data = doc.data()
                ticketsList.push(data)
            })
    
            const lastDoc = snapshot.docs[snapshot.docs.length -1]
    
            setLastDocs(lastDoc)
            setTickets(tickets => [...tickets, ...ticketsList])
            setLoading(false)
        } else {
            setIsEmpty(true)
        }
        setLoadingMore(false)
        
    }

    async function handleMore() {
        setLoadingMore(true)
        const searchQuery = query(
            ticketsRef,
            where('createdBy', '==', user.id),
            orderBy('createdAt', 'desc'),
            startAfter(lastDocs),
            limit(3)
        );
        
        getTickets(searchQuery)
       

    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>
                </div>
                <div className="container dashboard">
                    <span>Buscado chamados...</span>
                </div>
            </div>
        )
    }

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
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((item, index) => (
                                    <RenderTable item={item} index={index} />
                                ))}
                            </tbody>
                        </table>
                        {loadingMore && (
                            <h1 className="text-more">Carregado...</h1>
                        )}
                        {!loadingMore && !isEmpty && (
                            <button className="btn-more" onClick={handleMore}>Buscar mais</button>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}