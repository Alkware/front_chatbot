import axios from "axios"
import { API_URL } from "./url-api"
import { Create_project, Update_project } from "../@types/Project"

export async function createNewProject(data: Create_project) {
    const project = await axios.post(`${API_URL}/create/project`, data).catch(err => console.warn(err))

    return project
}

/**
 * Função responsável por enviar as informações do projeto até o back-end...
 * @param data 
 * @param project_slug 
 * @returns 
 */
export async function updateProject(data: Update_project, project_slug: string) {
    
    const project = await axios.put(`${API_URL}/project/${project_slug}/update`, data).catch(err => console.warn(err))

    if(!project) return

    return project.data
}

export async function checkSlugIsAvailable(slug: string) {
    const response = await axios.get(`${API_URL}/project/check_slug/${slug}`).catch(err => console.warn(err))

    return response?.data.available
}


export async function updateIsOnlineProject(isOnline: boolean, project_slug: string) {
    const project = await axios.put(`${API_URL}/project/${project_slug}/is_online/update`, {
        is_online: isOnline
     }).catch(err => console.warn(err))

    return project
}

export async function deleteProject(project_id: string){
    const deleted = await axios.delete(`${API_URL}/project/${project_id}/delete`).catch(err => console.warn(err))

    return deleted
}

export async function findAllProjectsByPlanManagementId(planManagementId: string){
    const projects = await axios.get(`${API_URL}/projects/${planManagementId}`).catch(err => console.warn(err))

    return projects
}