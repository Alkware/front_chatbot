import axios from "axios";
import { API_URL } from "./url-api";
import { createLog } from "./log";
import { Image, SaveImageInfo } from "../@types/images.types";

/**
 * Função responsável por subir o arquivo no servidor da imgBB e salvar as informações da imagem no banco de dados.
 * @param {File} file Arquivo para ser feito o upload.
 * @param {Image} image_info Informações da imagem.
 * @returns {Image} Retorna um objeto com todas as informações da imagem.
 */
export async function uploadImage(file: File, image_info: SaveImageInfo): Promise<Image | void> {
    try {
        if (file.size < 4000000) {
            // Cria um objeto FormData para o file...
            const form = new FormData();
            form.append('image', file);

            // Faz o upload do file no servidor da imgBB...
            const responseUploadImage = await axios.post(`${API_URL}/upload_image`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(err => console.warn("ERRO:", err));

            // Verifica se foi feito o upload...
            if (!responseUploadImage) throw new Error("Unable to upload the image");

            // Adiciona a url da imagem que acabou de ser upada...
            image_info.url = responseUploadImage.data.url;
            // Salva a imagem no banco de dados...
            const responseSaveImage = await axios.post(`${API_URL}/save_image`, image_info).catch(err => console.warn("ERRO:", err));

            // Verifica se a imagem foi salva...
            if (!responseSaveImage) throw new Error("Unable to save the image")
            return responseSaveImage.data
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

export async function getImagesById(client_id: string) {
    const response = await axios.get(`${API_URL}/images/${client_id}`).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to search the images");
        return
    }

    return response.data
}


export async function deleteImageById(client_id: string) {
    const response = await axios.delete(`${API_URL}/image/${client_id}`).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to delete the image");
        return
    }

    return response.data
}