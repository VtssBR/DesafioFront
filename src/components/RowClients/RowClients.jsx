import { useContext, useState } from "react";
import { ClientContext } from "../../contexts/ClientContext";
import styles from "./RowClients.module.css";
import { Link } from "react-router-dom";

export default function RowClients() {
    const { clients, deleteClientState } = useContext(ClientContext);
    const [search, setSearch] = useState("");

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            await deleteClientState(id);
            window.location.reload();
        }
    };

    const filteredClients = clients.filter(client =>
        client.nome.toLowerCase().includes(search.toLowerCase()) || client.cpf.includes(search)
    );

    return (
        <div>
            <div className={styles.topBar}>
                <input
                    type="text"
                    placeholder="Buscar por Nome ou CPF"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.divButton}>
                    <Link to={`/create/`}>
                        <button className={styles.btnAddClients}>Adicionar Cliente</button>
                    </Link>
                </div>
            </div>

            {filteredClients.length === 0 ? (
                <p className={styles.txtNotFound}>Nenhum cliente encontrado.</p>
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
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.nome}</td>
                                <td>{client.cpf}</td>
                                <td>{new Date(client.dataNascimento).toLocaleDateString("pt-BR")}</td>
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
