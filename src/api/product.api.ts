import axios, { AxiosResponse } from "axios";
import { Product } from "../@types/products.types";
import { API_URL } from "./url-api";

type ProductInfo = Omit<Product, "id" | "created_at" | "updated_at" | "images_products_services"> & {
    images_products_services: string[]
}

/**
 * Função responsável por enviar as informações do produto para o back-end.
 * @param {Product} productInfo Objeto com as informações do produto para serem criadas...
 * @returns {Product} Retorna um objeto com todos as informações do produto criado.
 */
export async function createNewProduct(productInfo: ProductInfo): Promise<Product | void> {

    const response: void | AxiosResponse<Product> = await axios.post(`${API_URL}/product/create`, productInfo)
        .catch(err => console.error(err))

    if (!response) return;

    return response.data;
}

/**
 * Função responsável por atualizar as informações do produto no back-end.
 * @param {Product} productInfo Objeto com as informações do produto para serem atualizadas...
 * @returns {Product} Retorna um objeto com todos as informações atualizadas.
 */
export async function updateProduct(product_id: string, productInfo: ProductInfo): Promise<Product | void> {

    const response: void | AxiosResponse<Product> = await axios.put(`${API_URL}/product/update/${product_id}`, productInfo)
        .catch(err => console.error(err))

    if (!response) return;

    return response.data;
}

/**
 * Rota responsável por deletar o produto no banco de dados baseado no seu id.
 * @param {string} id Id unico do produto.
 * @returns {Product} Retorna as informações do produto excluido.
 */
export async function deleteProduct(id: string): Promise<Product | void> {

    const response = await axios.delete(`${API_URL}/product/delete/${id}`).catch(err => console.error(err));

    if(!response) return;

    return response.data;
}