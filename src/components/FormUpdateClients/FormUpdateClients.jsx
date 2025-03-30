import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../contexts/ClientContext";
import styles from "./FormUpdateClients.module.css";

export default function FormUpdateClients() {
    const { id } = useParams();
    const { updateClientState } = useContext(ClientContext);
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        endereco: ""
    });

    const [selectedFields, setSelectedFields] = useState({
        nome: false,
        cpf: false,
        dataNascimento: false,
        endereco: false
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

        const clientData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, value.trim() === "" ? null : value])
        );

        try {
            await updateClientState(clientData, id);
            console.log("Cliente atualizado com sucesso:", clientData);

            setFormData({
                nome: "",
                cpf: "",
                dataNascimento: "",
                endereco: ""
            });
            setSelectedFields({ nome: false, cpf: false, dataNascimento: false, endereco: false });
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Atualizar Cliente</h1>
            <div className={styles.checkboxContainer}>
                <label>
                    <input
                        type="checkbox"
                        name="nome"
                        checked={selectedFields.nome}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Nome
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="cpf"
                        checked={selectedFields.cpf}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar CPF
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="dataNascimento"
                        checked={selectedFields.dataNascimento}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Data de Nascimento
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="endereco"
                        checked={selectedFields.endereco}
                        onChange={handleCheckboxChange}
                    />
                    Atualizar Endereço
                </label>
            </div>

            {selectedFields.nome && (
                <>
                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </>
            )}

            {selectedFields.cpf && (
                <>
                    <label htmlFor="cpf" className={styles.label}>CPF:</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className={styles.input}
                        maxLength="14"
                    />
                </>
            )}

            {selectedFields.dataNascimento && (
                <>
                    <label htmlFor="dataNascimento" className={styles.label}>Data de Nascimento:</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        className={styles.dateInput}
                    />
                </>
            )}

            {selectedFields.endereco && (
                <>
                    <label htmlFor="endereco" className={styles.label}>Endereço:</label>
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </>
            )}

            <button type="submit" className={styles.submitButton}>
                Atualizar Cliente
            </button>
        </form>
    );
}
