import { useContext, useState} from "react";
import { ClientContext } from "../../contexts/ClientContext";
import styles from "./FormCreateClients.module.css";

export default function FormCreateClients() {
    const { createClientState, error, setError } = useContext(ClientContext);
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        endereco: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setError("")
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createClientState(formData);
            setFormData({ nome: "", cpf: "", dataNascimento: "", endereco: "" });
        } catch (error) {
            console.error("Erro ao criar cliente:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Criar Cliente</h1>

            <label htmlFor="nome" className={styles.label}>Nome:</label>
            <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className={styles.input}
                required
            />

            <label htmlFor="cpf" className={styles.label}>CPF:</label>
            <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className={styles.input}
                required
                maxLength="14"
            />

            <label htmlFor="dataNascimento" className={styles.label}>Data de Nascimento:</label>
            <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                required
                className={styles.dateInput}
            />

            <label htmlFor="endereco" className={styles.label}>Endereço:</label>
            <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                className={styles.input}
                required
            />

            {/* Exibir mensagem de erro */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
                Criar Cliente
            </button>
        </form>
    );
}
