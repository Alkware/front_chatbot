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
        // Cria um objeto FormData para o file...
        const form = new FormData();
        form.append('image', file);

        // Faz o upload do file no servidor da imgBB...
        const responseUploadImage = await axios.post(`${API_URL}/upload_image`, form).catch(async err => {
            console.warn("ERRO:", err);
            await createLog({
                level: "warning",
                path: "src/api/images.ts Ln: 20",
                log: "Falha ao tentar fazer o upload da imagem",
                sector: "Plataforma"
            });
        });

        // Verifica se foi feito o upload...
        if (!responseUploadImage) throw new Error("Unable to upload the image");

        image_info.url = responseUploadImage.data.url;
        image_info.file_name = responseUploadImage.data.file_name;
        // Salva a imagem no banco de dados...
        const responseSaveImage = await axios.post(`${API_URL}/save_image`, image_info).catch(err => console.warn("ERRO:", err));

        // Verifica se a imagem foi salva...
        if (!responseSaveImage) throw new Error("Unable to save the image")
        return responseSaveImage.data
        
}

export async function getImagesByClient_id(client_id: string) {
    const response = await axios.get(`${API_URL}/images/client/${client_id}`).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to search the images");
        return
    }

    // Formato correto para consiliar com o modo de busca das imagens
    return response.data
}

export async function getImagesById(image_id: string) {
    const response = await axios.get(`${API_URL}/image/${image_id}`).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to search the image by id");
        return
    }

    // Formato correto para consiliar com o modo de busca das imagens
    return response.data
}


export async function getManyImagesById(images_id: string[]) {
    const response = await axios.patch(`${API_URL}/images`, { images_id }).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to search the images");
        return
    }

    // Formato correto para consiliar com o modo de busca das imagens
    return response.data
}

/**
 * Função responsável por atualizar todas as imagens com o id do produto recem criado.
 * @param {string[]} images_id Array contendo os id das imagens.
 * @returns {Image[]} Retorna um array com todas as imagens que foram atualizadas
 */
export async function updateManyImagesById(product_id: string, images_id: string[]): Promise<Image[] | void> {
    const response = await axios.put(`${API_URL}/images/update/${product_id}`, { images_id }).catch(err => console.error("ERRO:", err));

    if (!response?.data) {
        return
    }

    // Formato correto para consiliar com o modo de busca das imagens
    return response.data
}

export async function deleteImageById(client_id: string) {
    const response = await axios.delete(`${API_URL}/image/${client_id}`).catch(err => console.warn("ERRO:", err));

    if (!response?.data) {
        console.error("Unable to delete the image");
        return
    }

    // Formato correto para consiliar com o modo de busca das imagens
    return response.data
}