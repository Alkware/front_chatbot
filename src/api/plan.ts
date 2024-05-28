import axios from "axios";
import { API_URL } from "./url-api";

export async function getPlans(){
    const plans = await axios.get(`${API_URL}/plans`).catch(err => console.warn(err))

    return plans
}