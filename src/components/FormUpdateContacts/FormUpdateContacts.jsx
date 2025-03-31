import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { ContactContext } from "../../contexts/ContactContext";
import styles from "./FormUpdateContacts.module.css";

export default function FormUpdateContacts() {
    const { id } = useParams();
    const { updateContactState } = useContext(ContactContext);
    const [formData, setFormData] = useState({
        tipo: "Celular",
        valor: "",
        observacao: ""
    });

    const [updateObservacao, setUpdateObservacao] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target || { name: "valor", value: event };
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, value.trim() === "" ? null : value])
        );

        try {
            await updateContactState(contactData, id);
            setFormData({ tipo: "Celular", valor: "", observacao: "" });
            setUpdateObservacao(false);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar contato:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Atualizar Contato</h1>

            <label htmlFor="tipo" className={styles.label}>Tipo:</label>
            <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className={styles.input}
            >
                <option value="Celular">Celular</option>
                <option value="Email">Email</option>
            </select>

            <label htmlFor="valor" className={styles.label}>Valor:</label>
            {formData.tipo === "Celular" ? (
                <IMaskInput
                    mask="(00) 00000-0000"
                    name="valor"
                    value={formData.valor}
                    onAccept={handleInputChange}
                    className={styles.input}
                />
            ) : (
                <input
                    type="email"
                    name="valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                    className={styles.input}
                />
            )}

            <label>
                <input
                    type="checkbox"
                    checked={updateObservacao}
                    onChange={(e) => setUpdateObservacao(e.target.checked)}
                />
                Atualizar Observação
            </label>

            {updateObservacao && (
                <>
                    <label htmlFor="observacao" className={styles.label}>Observação:</label>
                    <input
                        type="text"
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </>
            )}

            <button type="submit" className={styles.submitButton}>
                Atualizar Contato
            </button>
        </form>
    );
}
