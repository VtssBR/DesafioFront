const URL = "http://localhost:8080/api/contact"

export const getContacts = async (id) => {
    const response = await fetch(`${URL}/list/${id}`) //Listagem baseada no id do cliente
    if (!response.ok) throw new Error("Erro ao buscar contatos");
    return response.json();
}

export const addContacts = async (newContact) => {
    const response = await fetch(`${URL}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
    })
    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao criar contato"); 
    }
    return response.json();
}

export const getContactById = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao buscar contato");
    return response.json();
}

export const attContact = async (contactUpdated, id) => {
    const response = await fetch(`${URL}/update/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactUpdated)
    })
    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao criar contato"); 
    }
    return response.json();
}

export const deleteContact = async (id) => {
    const response = await fetch(`${URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao excluir contato");
    return response.json();
}

