import axios from "axios"
import { clientLoginTypes, clientRegisterTypes } from "../@types/Client"
import { API_URL } from "./url-api"

export async function getClientById(id: string) {
    const client = await axios.get(`${API_URL}/client/${id}`).catch(err => console.warn(err))

    return client
}

export async function registerClient({ email, password, fullname }: clientRegisterTypes) {

    const client = await axios.post(`${API_URL}/client/create`, { email, password, fullname })
        .catch(error => console.warn(error))
    return client
}


export async function authenticateClient(token: string) {
    const client = await axios.get(`${API_URL}/authenticate`, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).catch(error => console.warn(error));

    return client
}


export async function loginClient({ email, password }: clientLoginTypes) {

    const client = await axios.post(`${API_URL}/client/login`, { email, password }).catch(err => console.warn(err))

    return client

}

export async function loginClientFirstAccess({ email, cpf_cnpj }: { email: string, cpf_cnpj: string }) {

    const client = await axios.post(`${API_URL}/client/first_access`, { email, cpf_cnpj}).catch(err => console.warn(err))

    return client

}

export async function updateClient(data: { client_id: string, fullname?: string, logo?: string, cpf_cnpj?: string, user?: string }) {
    const client = await axios.put(`${API_URL}/client/update`, data).catch(err => console.warn(err))

    return client
}


export async function changePasswordClient(data: { client_id: string, current_password: string, new_password: string }) {

    const client = await axios.put(`${API_URL}/client/change_password/${data.client_id}`, data)
        .catch(err => {
            console.error(err)
        })

    return client
}

export async function checkUserIsAvailable(user: string) {

    const response = await axios.get(`${API_URL}/client/check_user/${user}`)
        .catch(err => {
            console.error(err)
        })

    return response?.data.available
}


export async function updateTutorialClient(client_id: string, tutorial: boolean) {

    const response = await axios.put(`${API_URL}/client/update_tutorial`, { client_id, tutorial })
        .catch(err => {
            console.error(err)
        })

    return response?.data
}