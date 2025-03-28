import { useContext } from "react";
import { ClientContext } from "../contexts/ClientContext";


export default function ListClients() {
    const { clients } = useContext(ClientContext);

    return (
        <div>
            {clients.length === 0 ? ( 
                <p>Nenhum produto encontrado.</p>
            ) : (
                clients.map((client) => (
                    <div key={client.id}>
                        <h4>NOME: {client.nome}</h4>
                        <h4>CPF: {client.cpf}</h4>
                        <h4>DATA DE NASCIMENTO:{client.dataNascimento}</h4>
                        <h4>ENDERECO: {client.endereco}</h4>
                    </div>
                ))
            )}
        </div>
    );
}
