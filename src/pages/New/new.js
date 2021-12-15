import { useState } from 'react'
import Header from '../../components/Header/header'
import Title from '../../components/Title/title'
import { FiPlusCircle } from 'react-icons/fi'
import './new.css'

function New(){
    const [matters, setMatters]         = useState("Suporte")
    const [mattersList, setMattersList] = useState(["Suporte", "Visita ternica", "Financeiro"])

    const [status, setStatus]           = useState("Aberto") 
    const [statusList, setStatusList]   = useState(["Aberto", "Progresso", "Atendido"])
    
    const [complement, setComplement]   = useState("") 

    function handleRegister(event){
        event.preventDefault();
    }
    
    function handleChangeSelect(event){
        setMatters(event.target.value)
    }

    function handleOptionChange(event){
        setStatus(event.target.value)
    }
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>
                        <select>
                            <option key={1} value={1}>Sujeito Programador</option>
                            <option key={2} value={2}>alexandre</option>
                            <option key={3} value={3}>joao</option>
                        </select>

                        <label>Assunto</label>
                        <select value={matters} onChange={handleChangeSelect}>
                            {mattersList.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            {statusList.map((item, index) => (
                                <>
                                    <input 
                                        type="radio"
                                        name="radio"
                                        value={item}
                                        onChange={handleOptionChange}
                                        checked={ status === item}
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
                            onChange={ e => setComplement(e.target.value)}
                        />

                        <button type="submit">Registrar</button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default New