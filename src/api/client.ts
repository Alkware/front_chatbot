import axios from "axios"
import { API_URL } from "./url-api"
import { clientLoginTypes, clientRegisterTypes } from "../types/clientTypes"

export async function getClient(store_name: string) {
    const client = await axios.get(`${API_URL}/client/${store_name}`).catch(err => console.log(err))

    return client
}

export async function getClientWithGuest(store_name: string, guest: string) {
    const client = await axios.get(`${API_URL}/client/${store_name}/guest/${guest}`).catch(err => console.log(err))

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
            Authorization: "Bearer "+token
        }
    }).catch(error => console.log(error))

    return client
}


export async function loginClient({ email, password }: clientLoginTypes){

    const client = await axios.post(`${API_URL}/client/login`, { email, password }).catch(err => console.log(err))

    return client

}
