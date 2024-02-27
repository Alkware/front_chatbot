import axios from "axios";
import { API_URL } from "./url-api";

export async function uploadImage(file: any) {
    console.log(file)
    try {
        console.log(file.size < 4000000)
        if (file.size < 4000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            console.log(reader)

            const form = new FormData();
            form.append('image', file);
            const response = await axios.post(`${API_URL}/upload_image`, form).catch(err => console.log("ERRO:", err))
            console.log(response)
            if (response) return response
        }
    } catch (error) {
        throw new Error("Unable to upload image.")
    }
}
