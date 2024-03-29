import axios from "axios"
import { clientLoginTypes, clientRegisterTypes } from "../@types/Client"
import { API_URL } from "./url-api"

export async function getClientById(id: string) {
    const client = await axios.get(`${API_URL}/client/${id}`).catch(err => console.log(err))

    return client
}

export async function registerClient({ email, password, fullname }: clientRegisterTypes) {

    const client = await axios.post(`${API_URL}/client/create`, { email, password, fullname })
        .catch(error => console.log(error))

    return client
}


export async function authenticateClient(token: string) {
    const client = await axios.get(`${API_URL}/authenticate`, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).catch(error => console.log(error))

    return client
}


export async function loginClient({ email, password }: clientLoginTypes) {

    const client = await axios.post(`${API_URL}/client/login`, { email, password }).catch(err => console.log(err))

    return client

}

export async function updateClient(data: { client_id: string, fullname?: string, logo?: string,  cpf_cnpj?: string, user?: string  }) {
    const client = await axios.put(`${API_URL}/client/update`, data).catch(err => console.log(err))

    return client
}


export async function changePasswordClient(data: { client_id: string, current_password: string, new_password: string }) {

    const client = await axios.put(`${API_URL}/client/change_password/${data.client_id}`, data)
    .catch(err =>{
        console.error(err)
    })

    return client
}

export async function checkUserIsAvailable(user: string) {

    const response = await axios.get(`${API_URL}/client/check_user/${user}`)
    .catch(err =>{
        console.error(err)
    })

    return response?.data.available
}