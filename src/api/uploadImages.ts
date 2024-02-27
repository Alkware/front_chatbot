import axios from "axios";
import { API_URL } from "./url-api";

export async function uploadImage(file: any) {
    try {
        console.log("This image has:", Number(file.size / (1024 * 1024)))
        if (file.size < 4000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const form = new FormData();
            form.append('image', file);
            const response = await axios.post(`${API_URL}/upload_image`, form).catch(err => console.log("ERRO:", err))

            if (response) return response
            
        }
    } catch (error) {
        throw new Error("Unable to upload image.")
    }
}
