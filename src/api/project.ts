import axios from "axios"
import { API_URL } from "./url-api"
import { ProjectCreateTypes, Project } from "../@types/Project"

export async function createNewProject(data: ProjectCreateTypes) {
    const project = await axios.post(`${API_URL}/create/project`, data).catch(err => console.log(err))

    return project
}

export async function updateProject(data: Project, project_slug: string) {
    
    const project = await axios.put(`${API_URL}/project/${project_slug}/update`, data).catch(err => console.log(err))

    return project
}

export async function checkSlugIsAvailable(slug: string) {
    const response = await axios.get(`${API_URL}/project/check_slug/${slug}`).catch(err => console.log(err))

    return response?.data.available
}


export async function updateIsOnlineProject(isOnline: boolean, project_slug: string) {
    const project = await axios.put(`${API_URL}/project/${project_slug}/is_online/update`, {
        is_online: isOnline
     }).catch(err => console.log(err))

    return project
}

export async function deleteProject(project_id: string){
    const deleted = await axios.delete(`${API_URL}/project/${project_id}/delete`).catch(err => console.log(err))

    return deleted
}

export async function findAllProjectsByPlanManagementId(planManagementId: string){
    const projects = await axios.get(`${API_URL}/projects/${planManagementId}`).catch(err => console.log(err))

    return projects
}