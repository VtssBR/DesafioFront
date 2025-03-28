const URL = "http://localhost:8080/api/client"

export const getClients = async () => {
    const response =  await fetch(`${URL}/list`)
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return response.json();
}

export const addClients = async (newClient) => {
    const response = await fetch(`${URL}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient)
    })
    if (!response.ok) throw new Error("Erro ao criar clientes");
    return response.json();
}

export const getClientById = async (id) =>{
    const response = await fetch(`${URL}/${id}`,{
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao buscar cliente");
    return response.json();
}

export const attClient = async (clientUpdated, id) => {
    const response = await fetch(`${URL}/update/${id}`,{
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientUpdated)
    })
    if (!response.ok) throw new Error("Erro ao atualizar cliente");
    return response.json();
}

export const deleteClient = async (id) => {
    const response = await fetch(`${URL}/delete/${id}`,{
        method:'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao excluir cliente");
    return response.json();
}

