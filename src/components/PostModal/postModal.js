import React, { useContext } from "react"
import './postModal.css'
import { FiX } from "react-icons/fi"
import { AuthContext } from "../../contexts/auth"
import { format } from "date-fns"
export default function PostModal() {

    const statusColor = ['#3583f6', '#F6a935', '#5fd204']
    const status = ["Aberto", "Progresso", "Atendido"]
    const matters     = ["Suporte", "Visita ternica", "Financeiro"]

    const { showPostModal, setShowPostModal, itemSelected } = useContext(AuthContext)

    const date = format(itemSelected.createdAt.toDate(), 'dd/MM/yyyy')

    return (
        <div 
            className="modal" 
            style={{display: showPostModal ? 'flex' : "none"}} 
        >
            <div className="container">
                <button 
                    className="btn-close" 
                    onClick={() => setShowPostModal(false)}
                >
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>
                <div>
                    <h2>Detalhes do chamado</h2>

                    <div className="row">
                        <span>
                            Cliente: <a>{itemSelected.customer}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Assunto: <a>{matters[itemSelected.matters]}</a>
                        </span>

                        <span>
                            Cadastrado em: <a>{date}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: 
                            <a href
                                className="badge"
                                style={{ backgroundColor: statusColor[itemSelected.status], color: '#FFF'}}
                            >{status[itemSelected.status]}</a>
                        </span>
                    </div>


                    {itemSelected.complement && 
                        <div className="row">
                            <h3>Complemento:</h3>
                            <p>
                                {itemSelected.complement}
                            </p>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}