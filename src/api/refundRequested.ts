import axios from "axios";
import { API_URL } from "./url-api";

interface RefundRequested {
    client_id: string,
    reason: string,
    product_review: number
}

export async function refundRequested(data: RefundRequested) {
    const response = await axios.post(`${API_URL}/refund_requested`, data).catch(err => console.log(err))
    return response
}


export async function reactivatePlan(client_id: string) {
    const response = await axios.post(`${API_URL}/refund_requested/reactive`, { client_id }).catch(err => console.log(err))
    return response
}