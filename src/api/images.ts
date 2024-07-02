import axios from "axios";
import { API_URL } from "./url-api";
import { createLog } from "./log";

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
        await createLog({
            level: "warning",
            path: "src/api/images.ts Ln: 20",
            log: "Falha ao tentar fazer o upload da imagem",
            sector: "Plataforma"
        });
        throw new Error("Unable to upload image.")
    }
}


export async function saveImage(data: { url: string, description: string, client_id: string, prompt_id?: string }) {

    const response = await axios.post(`${API_URL}/save_image`, data)
        .catch(err => console.warn("ERRO:", err));

    return response

}
