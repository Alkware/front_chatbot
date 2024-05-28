import axios from "axios";
import { API_URL } from "./url-api";

export async function getPlanMessageManagerByProjectId(id: string | undefined){
    if(!id) return
    
    const information = await axios.get(`${API_URL}/plan_message_manager/information/${id}`).catch(err => console.warn(err))

    return information
}