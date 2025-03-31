import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";
import styles from "./FormCreateContacts.module.css";

export default function FormCreateContacts() {
    const { createContactState } = useContext(ContactContext);
    const { id: clientId } = useParams(); // Utiliza o clientId para criacao do contato vinculado ao cliente

    const [formData, setFormData] = useState({
        tipo: "", 
        valor: "",
        observacao: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = {
            clientId: Number(clientId), 
            tipo: formData.tipo,
            valor: formData.valor,
            observacao: formData.observacao
        };

        try {
            await createContactState(contactData);
            console.log("Contato criado com sucesso:");
            setFormData({ tipo: "", valor: "", observacao: "" });
        } catch (error) {
            console.error("Erro ao criar contato:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Criar Contato</h1>

            <label htmlFor="tipo" className={styles.label}>Tipo:</label>
            <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className={styles.input}
                required
            >
                <option value="">Selecione um tipo</option>
                <option value="Celular">Celular</option>
                <option value="Email">Email</option>
            </select>

            <label htmlFor="valor" className={styles.label}>Valor:</label>
            <input
                type="text"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                className={styles.input}
                required
            />

            <label htmlFor="observacao" className={styles.label}>Observação:</label>
            <input
                type="text"
                name="observacao"
                value={formData.observacao}
                onChange={handleInputChange}
                className={styles.input}
            />

            <button type="submit" className={styles.submitButton}>
                Criar Contato
            </button>
        </form>
    );
}
