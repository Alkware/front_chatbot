import axios from "axios"
import { API_URL } from "./url-api"
import { ProjectCreateTypes, ProjectTypes } from "../@types/projectTypes"

export async function createNewProject({ project_name, logo, prompt, plan_management_id, bio, call_to_action, describe_client, pixel_facebook, chat_input_message }: ProjectCreateTypes) {
    console.log(plan_management_id)
    const project = await axios.post(`${API_URL}/create/project`, {
        project_name, logo, prompt, plan_management_id, bio, call_to_action, describe_client, pixel_facebook, chat_input_message
    }).catch(err => console.log(err))

    return project
}

export async function updateProject({ project_name, slug, logo, prompt, plan_management_id, bio, describe_client, call_to_action, pixel_facebook,chat_input_message }: ProjectTypes, project_slug: string) {
    const newSlug = project_slug.split("-")[0]+"-"+slug

    const project = await axios.put(`${API_URL}/project/${project_slug}/update`, {
        project_name, slug: newSlug, logo, prompt, plan_management_id, bio, describe_client, call_to_action, pixel_facebook, chat_input_message
    }).catch(err => console.log(err))

    return project
}

export async function deleteProject(project_id: string){
    const deleted = await axios.delete(`${API_URL}/project/${project_id}/delete`).catch(err => console.log(err))

    return deleted
}


export async function findAllProjectsById(project_id: string){
    const projects = await axios.get(`${API_URL}/projects/${project_id}`).catch(err => console.log(err))

    return projects
}