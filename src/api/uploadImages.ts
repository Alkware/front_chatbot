import axios from "axios";
import { API_URL } from "./url-api";

export async function uploadImage(imageForm: any) {
    const response = await axios.post(`${API_URL}/upload_image`, imageForm)

    return response
}