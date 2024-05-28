import axios from "axios";
import { API_URL } from "./url-api";

export async function updateReadNotification(id: string){

    const response = await axios.post(`${API_URL}/notification/${id}/read`).catch(err => console.warn(err));

    return response

}