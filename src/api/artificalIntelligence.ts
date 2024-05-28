import axios from "axios"
import { API_URL } from "./url-api"

export async function analizyDataWithArtifialIntelligence(prompt: string) {

    const response = await axios.post(`${API_URL}/analyze_metric`, { prompt }).catch(err => console.warn(err))

    return response
}