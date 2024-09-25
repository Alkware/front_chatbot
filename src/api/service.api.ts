import axios, { AxiosResponse } from "axios";
import { API_URL } from "./url-api";
import { Create_Service, Service } from "../@types/services.types";
import { Image } from "../@types/images.types";

/**
 * Função responsável por enviar as informações do serviço para o back-end.
 * @param {Service} serviceInfo Objeto com as informações do serviço para serem criadas...
 * @returns {Service} Retorna um objeto com todos as informações do serviço criado.
 */
export async function createNewService(serviceInfo: Create_Service): Promise<Service | void> {

    // Transforma o id em um campo opcional para ser deletado...
    const duplicateProduct: Omit<Create_Service, "id" | "image_main"> & { id?: string, image_main?: Image } = serviceInfo;

    delete duplicateProduct["id"];
    delete duplicateProduct["created_at"];
    delete duplicateProduct["updated_at"];
    delete duplicateProduct["plan_management"];
    delete duplicateProduct["image_main"];

    const response: void | AxiosResponse<Service> = await axios.post(`${API_URL}/service/create`, duplicateProduct)
        .catch(err => console.error(err))

    if (!response) return;

    return response.data;
}

/**
 * Função responsável por atualizar as informações do serviço no back-end.
 * @param {Service} serviceInfo Objeto com as informações do serviço para serem atualizadas...
 * @returns {Service} Retorna um objeto com todos as informações atualizadas.
 */
export async function updateService(service_id: string, serviceInfo: Create_Service): Promise<Service | void> {

    const response: void | AxiosResponse<Service> = await axios.put(`${API_URL}/service/update/${service_id}`, serviceInfo)
        .catch(err => console.error(err))

    if (!response) return;

    return response.data;
}

/**
 * Rota responsável por deletar o serviço no banco de dados baseado no seu id.
 * @param {string} id Id unico do serviço.
 * @returns {Service} Retorna as informações do serviço excluido.
 */
export async function deleteService(id: string): Promise<Service | void> {

    const response = await axios.delete(`${API_URL}/service/delete/${id}`).catch(err => console.error(err));

    if (!response) return;

    return response.data;
}