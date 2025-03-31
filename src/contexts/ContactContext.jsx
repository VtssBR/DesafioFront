import { createContext, useState } from "react";
import {addContacts, getContactById, attContact, deleteContact } from "../services/ContactService";

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

     const getContactByIdState = async (id) => {
            try {
                const contactId = await getContactById(id)
                setContact(contactId)
            } catch (error) {
                setError(error.message)
            }
    
        }


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
        <ContactContext.Provider value={{ contacts, contact, setError, setContacts, getContactByIdState,  createContactState, updateContactState, deleteContactState }}>
            {children}
        </ContactContext.Provider>
    );
};
