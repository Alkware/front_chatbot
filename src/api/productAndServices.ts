import axios from "axios";
import { API_URL } from "./url-api";
import { Service } from "../@types/services.types";
import { Product } from "../@types/products.types";


export interface ProductsAndServices {
    products: Product[];
    services: Service[]
}

/**
 * 
 * @param plan_management_id Id unico do gerenciador de plano do usuário
 * @returns {ProductsAndServices} retorna um objeto contendo todos os produtos e serviços criado pelo usuário
 */
export async function getAllProductsAndServices(plan_management_id: string): Promise<ProductsAndServices | void> {

    const responseProducts = await axios.get(`${API_URL}/products/${plan_management_id}`).catch(error => console.log(error))
    const responseServices = await axios.get(`${API_URL}/services/${plan_management_id}`).catch(error => console.log(error))

    if (!responseProducts?.data || !responseServices?.data) {
        console.error("Unable to find the products and services.");
        return;
    }

    return {
        services: responseServices.data,
        products: responseProducts.data
    }
}