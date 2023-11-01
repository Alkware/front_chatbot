import axios from "axios";
import { API_URL } from "./url-api";

interface UpdatePromptSystem {
    seller: string;
    support: string
}

export async function updatePromptsSystem({seller, support}: UpdatePromptSystem) {
    const response = await axios.post(`${API_URL}/system/create/prompt`, { seller, support }).catch(error => console.log(error))

    return response
}