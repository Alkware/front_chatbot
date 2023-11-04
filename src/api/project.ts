import axios from "axios"
import { API_URL } from "./url-api"

export async function createNewProject({ project_name, slug, logo, prompt, client_id, bio = "bio vazio" }: ProjectTypes) {
    const project = await axios.post(`${API_URL}/create/project`, {
        project_name, slug, logo, prompt, client_id, bio
    }).catch(err => console.log(err))

    return project
}
