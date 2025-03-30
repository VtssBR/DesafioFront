import { createContext, useState } from "react";
import {addContacts, attContact, deleteContact } from "../services/ContactService";

export const ContactContext = createContext({})

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);

    const createContactState = async (formData) => {
        try {
            const newContact = await addContacts(formData);
            setContacts((prevContacts) => [...prevContacts, newContact]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateContactState = async (formUpdateData, id) => {
        try {
            const updatedContact = await attContact(formUpdateData, id);
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === id ? updatedContact : contact
                )
            );
            setContact(updatedContact);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteContactState = async (id) => {
        try {
            await deleteContact(id);
            setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <ContactContext.Provider value={{ contacts, contact, setError, setContacts,  createContactState, updateContactState, deleteContactState }}>
            {children}
        </ContactContext.Provider>
    );
};
