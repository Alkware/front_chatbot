import axios from "axios"
import { Client, clientLoginTypes, clientRegisterTypes } from "../@types/Client.types"
import { API_URL } from "./url-api"

export async function getClientById(id: string) {
    const client = await axios.get(`${API_URL}/client/${id}`).catch(err => console.warn(err))

    if (!client) return;

    return client.data
}

export async function registerClient({ email, password, fullname, origin }: clientRegisterTypes) {
    const client = await axios.post(`${API_URL}/client/create`, { email, password, fullname, origin })
        .catch(error => console.error(error))
    return client
}

export async function authenticateClient(token: string) {
    const client = await axios.get(`${API_URL}/authenticate`, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).catch(error => console.warn(error));

    if (!client) return;

    return client.data
}


export async function loginClient({ email, password }: clientLoginTypes) {
    const client = await axios.post(`${API_URL}/client/login`, { email, password }).catch(err => console.warn(err))

    return client
}

export async function loginClientFirstAccess({ email, cpf_cnpj }: { email: string, cpf_cnpj: string }) {

    const client = await axios.post(`${API_URL}/client/first_access`, { email, cpf_cnpj }).catch(err => console.warn(err))

    return client

}

export async function updateClient(client_id: string, data: Partial<Client>) {
    const response = await axios.put(`${API_URL}/client/update/${client_id}`, data).catch(err => console.warn(err))
    if (!response) return;

    return response.data
}


export async function changePasswordClient(data: { client_id: string, current_password?: string, new_password: string }) {

    const client = await axios.put(`${API_URL}/client/change_password/${data.client_id}`, data)
        .catch(err => {
            console.error(err)
        })

    return client
}

// função com rota para recuperar a senha do usuário...
export async function recoverPassword(data: { email: string, fullname: string, cpf_cnpj: string }) {

    const response = await axios.patch(`${API_URL}/client/recover_password`, data)
        .catch(err => {
            console.error(err)
        })

    return response
}

export async function checkUserIsAvailable(user: string) {

    const response = await axios.get(`${API_URL}/client/check_user/${user}`)
        .catch(err => {
            console.error(err)
        })

    return response?.data.available
}


export async function updateStatusTour(client_id: string, tutorial: boolean) {

    const response = await axios.put(`${API_URL}/client/update_tutorial`, { client_id, tutorial })
        .catch(err => {
            console.error(err)
        })

    return response?.data
}