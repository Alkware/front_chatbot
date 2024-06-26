import axios from "axios";
import { API_URL } from "./url-api";


// Atualiza a leitura de uma notificação espesifica como true (Lida)...
export async function updateReadNotification(id: string){

    const response = await axios.post(`${API_URL}/notification/${id}/read`).catch(err => console.warn(err));

    return response

}

// Atualiza a leitura de todas as notificações como true (Lida)...
export async function updateReadAllNotifications(client_id: string){

    const response = await axios.post(`${API_URL}/notification/${client_id}/all_read`).catch(err => console.warn(err));

    return response

}