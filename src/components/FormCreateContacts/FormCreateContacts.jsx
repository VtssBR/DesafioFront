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
        setError(""); // Limpa o erro ao alterar o input
        setSuccessMessage(""); // Limpa a mensagem de sucesso ao alterar o input
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
            // Limpa mensagens anteriores antes de tentar criar o contato
            setError("");
            setSuccessMessage("");
            
            await createContactState(contactData);

            // Se a criação for bem-sucedida, exiba a mensagem de sucesso
            setSuccessMessage("Contato criado com sucesso!"); 
            console.log("SucessMessage do bloco try:", successMessage)
            setFormData({ tipo: "", valor: "", observacao: "" }); // Limpa os dados do formulário
        } catch (error) {
            // Se ocorrer um erro, exiba a mensagem de erro
            console.error("Erro ao criar contato:", error.message);
            console.log("error message do bloco catch: ", error)
            setError("Erro ao criar contato. Tente novamente."); // Define a mensagem de erro
            setSuccessMessage(""); // Limpa a mensagem de sucesso se houver erro
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

            {/* Exibição de mensagens de erro e sucesso */}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

            <button type="submit" className={styles.submitButton}>
                Criar Contato
            </button>
        </form>
    );
}
