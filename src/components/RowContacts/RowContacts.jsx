import { useContext, useEffect } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import styles from "./RowContacts.module.css";
import { Link, useParams } from "react-router-dom";
import { getContacts } from "../../services/ContactService";

export default function RowContacts() {
    const { id } = useParams();
    const { contacts, setContacts, setError, deleteContactState } = useContext(ContactContext);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await getContacts(id);
                    setContacts(data);
                } catch (error) {
                    setError(error.message);
                }
            }
        };
        fetchData();
    }, [id, setContacts, setError]);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este contato?")) {
            await deleteContactState(id);
            window.location.reload();
        }
    };


    return (
        <div>
            <div className={styles.divButton}>
                        <Link to={`/createContact/${id}`}>
                            <button className={styles.btnAddContact}>Adicionar Contato</button>
                        </Link>
            </div>
            {!contacts || contacts.length === 0 ? (
                <p>Nenhum contato encontrado.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Observacao</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.tipo}</td>
                                <td>{contact.valor}</td>
                                <td>{contact.observacao}</td>
                                <td className={styles.actions}>
                                    <Link to={`/updateContact/${contact.id}`}>
                                        <button className={styles.btnContact}>Editar</button>
                                    </Link>
                                    <button
                                        className={styles.btnContact}
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
