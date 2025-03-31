import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";
import styles from "./FormUpdateContacts.module.css";

export default function FormUpdateContacts() {
    const { id } = useParams();
    const { updateContactState } = useContext(ContactContext);
    const [formData, setFormData] = useState({
        tipo: "",
        valor: "",
        observacao: ""
    });

    const [selectedFields, setSelectedFields] = useState({ 
        tipo: false,
        valor: false,
        observacao: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedFields((prevFields) => ({
            ...prevFields,
            [name]: checked
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, value.trim() === "" ? null : value]) // Caso cliente nao informe algum campo, envia null para api no qual esta sendo tratada o null
        );

        try {
            await updateContactState(contactData, id);
            setFormData({
                tipo: "",
                valor: "",
                observacao: ""
            });
            setSelectedFields({ tipo: false, valor: false, observacao: false });
        } catch (error) {
            console.error("Erro ao atualizar contato:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Atualizar Contato</h1>
            <div className={styles.checkboxContainer}>
                <label>
                    <input
                        type="checkbox"
                        name="tipo"
                        checked={selectedFields.tipo}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Tipo
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="valor"
                        checked={selectedFields.valor}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Valor
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="observacao"
                        checked={selectedFields.observacao}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Observação
                </label>
            </div>

            {selectedFields.tipo && (
                <>
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
                </>
            )}

            {selectedFields.valor && (
                <>
                    <label htmlFor="valor" className={styles.label}>Valor:</label>
                    <input
                        type="text"
                        name="valor"
                        value={formData.valor}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </>
            )}

            {selectedFields.observacao && (
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
