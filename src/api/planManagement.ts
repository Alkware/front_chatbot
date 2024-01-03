import axios from "axios";
import { API_URL } from "./url-api";

export async function getPlanManagementById(id: string | undefined){
    if(!id) throw new Error("Id is missing")
    
    const plans = await axios.get(`${API_URL}/plan_management/${id}`).catch(err => console.log(err))

    return plans
}