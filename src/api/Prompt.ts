import axios from "axios"
import { API_URL } from "./url-api"
import { CreatePrompt } from "../@types/prompt.types"

interface NewCreatePrompt extends CreatePrompt {
    plan_management_id: string
}

export async function createNewDatabase(data: NewCreatePrompt) {
    const project = await axios.post(`${API_URL}/create/database`, data).catch(err => console.log(err))

    return project
}


export async function updateDatabase(data: CreatePrompt, prompt_id: string) {
    const project = await axios.put(`${API_URL}/update/database/${prompt_id}`, data).catch(err => console.log(err))

    return project
}

export async function updateDatabaseName(prompt_name: string, prompt_id: string) {
    const project = await axios.put(`${API_URL}/update/database_name/${prompt_id}`, { prompt_name }).catch(err => console.log(err))

    return project
}


export async function daleteDatabase(prompt_id: string) {
    const project = await axios.delete(`${API_URL}/delete/database/${prompt_id}`).catch(error => {
        const statusError = error.response.status
        if (statusError === 500) return { status: 500, data: null }
        console.error(error)
    })

    return project
}