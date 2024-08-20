import axios from "axios"
import { API_URL } from "./url-api"
import { Info_Artificial_Intelligence } from "../@types/artificialInteligence.types"


export async function createNewArtificialIntelligence(data: Info_Artificial_Intelligence) {
    const project = await axios.post(`${API_URL}/create/ai`, data).catch(err => console.warn(err))

    return project
}


export async function updateArtificialIntelligence(data: Info_Artificial_Intelligence, intelligence_id: string) {
    const project = await axios.put(`${API_URL}/update/ai/${intelligence_id}`, data).catch(err => console.warn(err))

    return project
}

export async function updateDatabaseName(prompt_name: string, prompt_id: string) {
    const project = await axios.put(`${API_URL}/update/database_name/${prompt_id}`, { prompt_name }).catch(err => console.warn(err))

    return project
}


export async function daleteArtificialIntelligence(intelligence_id: string) {
    const project = await axios.delete(`${API_URL}/delete/ai/${intelligence_id}`).catch(error => {
        const statusError = error.response.status
        if (statusError === 500) return { status: 500, data: null }
        console.error(error)
    })

    return project
}