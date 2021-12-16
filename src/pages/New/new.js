import { useState, useContext, useEffect } from 'react'
import Header from '../../components/Header/header'
import Title from '../../components/Title/title'
import { FiPlusCircle } from 'react-icons/fi'
import './new.css'
import { AuthContext } from '../../contexts/auth'
import { collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

function New() {
    const [mattersList, setMattersList]     = useState(["Suporte", "Visita ternica", "Financeiro"])
    const [statusList, setStatusList]       = useState(["Aberto", "Progresso", "Atendido"])
    const [customersList, setCustomersList] = useState([{id: 1, name: "Carregado..."}])

    const [matters, setMatters]       = useState(0)
    const [status, setStatus]         = useState(0)
    const [customer, setCustomer]     = useState(0)
    const [complement, setComplement] = useState("")

    const { user } = useContext(AuthContext)

    useEffect(() => {
        async function getCustomers() {
            const customersRef = collection(db, "custumers")

            const searchQuery = query(customersRef, orderBy('name', "desc"))
            const querySnapshot = await getDocs(searchQuery)
            let nameList = []
            querySnapshot.forEach(doc => {
                let data = {
                    id: doc.data().id,
                    name: doc.data().name
                }

                nameList.push(data)
            })
            if (nameList.length === 0) return
            setCustomersList(nameList)
        }
        getCustomers()
    }, [])

    function handleRegister(event) {
        event.preventDefault();
    }

    function handleChangeSelect(event) {
        setMatters(event.target.value)
    }

    function handleOptionChange(event) {
        setStatus(event.target.value)
    }

    function handleChangeCustomer(event) {
        setCustomer(event.target.value)
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>
                        <select value={customer} onChange={handleChangeCustomer}>
                            {customersList.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>

                        <label>Assunto</label>
                        <select value={matters} onChange={handleChangeSelect}>
                            {mattersList.map((name, index) => (
                                <option key={name.id} value={index}>{name}</option>
                            ))}
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            {statusList.map((item, index) => (
                                <>
                                    <input
                                        key={index}
                                        type="radio"
                                        name="radio"
                                        value={index}
                                        onChange={handleOptionChange}
                                        checked={status === index}
                                    />
                                    <span>{item}</span>
                                </>
                            ))}

                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)."
                            value={complement}
                            onChange={e => setComplement(e.target.value)}
                        />

                        <button type="submit">Registrar</button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default New