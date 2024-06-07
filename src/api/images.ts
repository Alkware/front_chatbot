import axios from "axios";
import { API_URL } from "./url-api";

export async function uploadImage(file: any) {
    try {
        if (file.size < 4000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const form = new FormData();
            form.append('image', file);
            const response = await axios.post(`${API_URL}/upload_image`, form).catch(err => console.warn("ERRO:", err))

            if (response) return response
        }
    } catch (error) {
        throw new Error("Unable to upload image.")
    }
}


export async function saveImage(data: { url: string, description: string, client_id: string, prompt_id?: string }) {

    const response = await axios.post(`${API_URL}/save_image`, data)
        .catch(err => console.warn("ERRO:", err));

    return response

}
