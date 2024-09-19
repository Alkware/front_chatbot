import axios, { AxiosResponse } from "axios";
import { API_URL } from "./url-api";
import { PlanManagement } from "../@types/planManagement";

/**
 * Função responsável por buscar o gerenciador de plano vinculado a conta do cliente.
 * @param {string} id Id único do gerenciador de plano do cliente.
 * @returns {PlanManagement}
 */
export async function getPlanManagementById(id: string | undefined): Promise<PlanManagement | void>{
    if(!id) throw new Error("Id is missing")
    
    const response: AxiosResponse<PlanManagement> | void  = await axios.get(`${API_URL}/plan_management/${id}`).catch(err => console.error(err))
    if(!response) return;

    return response.data as PlanManagement
}