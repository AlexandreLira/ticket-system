import React, { useContext } from "react"
import { FiEdit2, FiSearch } from "react-icons/fi"
import { format } from "date-fns"
import { AuthContext } from "../../contexts/auth"
import { Link } from "react-router-dom"

export default function RenderTable({ item, index }) {

    const statusColor = ['#3583f6', '#F6a935', '#5fd204']
    const status      = ["Aberto", "Progresso", "Atendido"]
    const matters     = ["Suporte", "Visita ternica", "Financeiro"]
    const date        = format(item.createdAt.toDate(), 'dd/MM/yyyy')
  
    
    const {showPostModal, setShowPostModal, setItemSelected} = useContext(AuthContext)

    function togglePostModal(item){
        setShowPostModal(!showPostModal)
        setItemSelected(item)
    }

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
            <td data-label="Ações">
                <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => togglePostModal(item)}>
                    <FiSearch color="#FFF" size={17} />
                </button>
                <Link className="action" style={{ backgroundColor: '#F6a935' }} to={`/new/${item.id}`}>
                    <FiEdit2 color="#FFF" size={17} />
                </Link>
            </td>
        </tr>
    )
}