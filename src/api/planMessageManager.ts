import axios from "axios";
import { API_URL } from "./url-api";

export async function getPlanMessageManagerByProjectId(id: string | undefined){
    if(!id) throw new Error("Id is missing")
    
    const information = await axios.get(`${API_URL}/plan_message_manager/information/${id}`).catch(err => console.log(err))

    return information
}