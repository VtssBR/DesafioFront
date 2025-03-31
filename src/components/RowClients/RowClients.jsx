import { useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";
import styles from "./RowClients.module.css";
import { Link } from "react-router-dom";

export default function RowClients() {
    const { clients, setClients } = useContext(ClientContext);
    const {deleteClientState} = useContext(ClientContext)

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            await deleteClientState(id); 
            window.location.reload();
            
        }
    };

    return (
        <div>
            {clients.length === 0 ? ( 
                <p>Nenhum cliente encontrado.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.nome}</td>
                                <td>{client.cpf}</td>
                                <td>{client.dataNascimento}</td>
                                <td>{client.endereco}</td>
                                <td className={styles.actions}>
                                    <Link to={`/update/${client.id}`}><button className={styles.btnClients}>Editar</button></Link>
                                    <button 
                                        className={styles.btnClients} 
                                        onClick={() => handleDelete(client.id)}
                                    >Excluir</button>
                                    <Link to={`/list/${client.id}`}><button className={styles.btnClients}>Visualizar Contatos</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
