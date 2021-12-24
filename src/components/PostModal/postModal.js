import React, { useContext } from "react"
import './postModal.css'
import { FiX } from "react-icons/fi"
import { AuthContext } from "../../contexts/auth"
import { differenceInDays, format } from "date-fns"
export default function PostModal() {

    const statusColor = ['#3583f6', '#F6a935', '#5fd204']
    const status = ["Aberto", "Progresso", "Atendido"]
    const matters = ["Suporte", "Visita ternica", "Financeiro"]

    const { setShowPostModal, itemSelected } = useContext(AuthContext)

    const createdAt = format(itemSelected.createdAt.toDate(), 'dd/MM/yyyy HH:mm:ss')
    const updatedAt = format(itemSelected.updatedAt.toDate(), 'dd/MM/yyyy HH:mm:ss')

    return (
        <div className="modal" >
            <div className="container">
                <button
                    className="btn-close"
                    onClick={() => setShowPostModal(false)}
                >
                    <FiX size={23} color="#FFF" />
                    Fechar
                </button>
                <div>
                    <h2>Detalhes do chamado</h2>


                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cliente">{itemSelected.customer}</td>
                                <td data-label="Assunto">{matters[itemSelected.matters]}</td>
                                <td data-label="Status">
                                    <span
                                        className="badge"
                                        style={{ backgroundColor: statusColor[itemSelected.status], color: '#FFF' }}
                                    >
                                        {status[itemSelected.status]}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">Atualizado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cadastrado em">{createdAt}</td>
                                <td data-label="Atualizado em">{updatedAt}</td>
                            </tr>
                        </tbody>
                    </table>

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