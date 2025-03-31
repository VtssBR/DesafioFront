import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";
import styles from "./FormCreateContacts.module.css";
import { IMaskInput } from "react-imask"; 

export default function FormCreateContacts() {
    const { createContactState, error, setError } = useContext(ContactContext);
    const { id: clientId } = useParams(); 
    const [successMessage, setSuccessMessage] = useState("");
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
        setError("");
        setSuccessMessage("")
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
            setFormData({ tipo: "", valor: "", observacao: "" });
            setSuccessMessage("Contato criado com sucesso")
        } catch(error) {
            console.error("Erro ao criar contato:", error.message);
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
            {formData.tipo === "Celular" ? (
                <IMaskInput
                    mask="(00) 00000-0000"
                    name="valor"
                    value={formData.valor}
                    onAccept={(value) => setFormData((prev) => ({ ...prev, valor: value }))}
                    className={styles.input}
                    required
                />
            ) : (
                <input
                    type={formData.tipo === "Email" ? "email" : "text"}
                    name="valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
            )}

            <label htmlFor="observacao" className={styles.label}>Observação:</label>
            <input
                type="text"
                name="observacao"
                value={formData.observacao}
                onChange={handleInputChange}
                className={styles.input}
            />

            {error && <p className={styles.errorMessage}>{error}</p>}
            
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

            <button type="submit" className={styles.submitButton}>
                Criar Contato
            </button>
        </form>
    );
}
