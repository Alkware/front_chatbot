import axios from "axios"
import { API_URL } from "./url-api"

export async function createNewDatabase(data: any) {
    const project = await axios.post(`${API_URL}/create/database`, data).catch(err => console.log(err))

    return project
}


export async function updateDatabase(data: any, prompt_id: string) {
    const project = await axios.put(`${API_URL}/update/database/${prompt_id}`, data).catch(err => console.log(err))

    return project
}