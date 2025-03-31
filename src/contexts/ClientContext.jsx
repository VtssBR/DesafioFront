import { createContext, useState, useEffect } from "react";
import { getClients, getClientById, addClients, attClient, deleteClient } from "../services/ClientService";

export const ClientContext = createContext({})


export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([])
    const [client, setClient] = useState(null)
    const [error, setError] = useState(null)


    //READ ALL
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClients()
                setClients(data)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData()
    }, [])


    const createClientState = async (formData) => {
        try {
            const newClient = await addClients(formData);
            setClients((prevClients) => [...prevClients, newClient]);
        } catch (error) {
            setError(error.message);
        }
    };

    const getClientByIdState = async (id) => {
        try {
            const clientId = await getClientById(id)
            setClient(clientId)
        } catch (error) {
            setError(error.message)
        }

    }

    const updateClientState = async (formUpdateData, id) => {
        try {
            const updatedClient = await attClient(formUpdateData, id);
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === id ? updatedClient : client
                )
            );
            setClient(updatedClient);

        } catch (error) {
            setError(error.message);
        }
    };

    const deleteClientState = async (id) => {
        try {
            const deletedClient = await deleteClient(id)
            setClient(deletedClient)
        } catch (error) {
            setError(error.message)
        }

    }


    return (
        <ClientContext.Provider value={{ clients, client, createClientState, getClientByIdState, updateClientState, deleteClientState }}>
            {children}
        </ClientContext.Provider>
    );
};
