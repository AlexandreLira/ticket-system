import { useState } from "react"
import { FiUser } from "react-icons/fi"
import { toast } from "react-toastify"
import Header from "../../components/Header/header"
import Title from "../../components/Title/title"

import { db } from '../../services/firebaseConnection'
import {
    doc,
    setDoc,
    collection,
    serverTimestamp
} from 'firebase/firestore' 

function Customers(){
    const [ name, setName ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [ address, setAdress] = useState('')

    const customersCollectionRef = collection(db, "custumers")


    async function handleAdd(event){
        event.preventDefault()
        if(name === '' || cnpj === '' || address === ''){
            toast.info('preencha todos os campos!')
            return
        }
        const newCustumer = doc(customersCollectionRef)
        const data = {
            id: newCustumer.id,
            name,
            cnpj,
            address,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()

        }
        
        await setDoc(newCustumer, data)
        .then(value => {
            toast.success('cliente cadastrado com sucesso!')
            setName("") 
            setCnpj("")
            setAdress("")
        
        }).catch(error => {
            toast.warning('Algo deu errado!')
        })


    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Novo cliente">
                    <FiUser size={25}/> 
                </Title>
                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input
                            type="text"
                            placeholder="Nome da empresa"
                            value={name}
                            onChange={ event => setName(event.target.value)}
                        />
                        <label>CNPJ</label>
                        <input
                            type="text"
                            placeholder="Seu CNPJ"
                            value={cnpj}
                            onChange={event => setCnpj(event.target.value)}
                        />
                        <label>Endereço</label>
                        <input
                            type="text"
                            placeholder="Endereço da empresa"
                            value={address}
                            onChange={event => setAdress(event.target.value)}
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>

        </div>
    )   
}

export default Customers