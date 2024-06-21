import axios from "axios";
import { API_URL } from "./url-api";

export async function getMessageManagerByProjectId(id: string | undefined){
    if(!id) return
    
    const information = await axios.get(`${API_URL}/message_manager/information/${id}`).catch(err => console.warn(err))

    return information
}