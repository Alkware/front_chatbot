import axios from "axios";
import { API_URL } from "./url-api";

/**
 * Função responsável por enviar o evento de acesso a landing page.
 * @returns {Object} retorna uma resposta a solicitação para criar um evento de acesso a pagina landing page 
 */
export async function createEventAccessedLandingPage(): Promise<object | void>{
    const response = await axios.post(`${API_URL}/facebook_event/accessed_landing_page`).catch(err => console.error(err));

    return response;
}

/**
 * Função responsável por enviar o evento de acesso a landing page.
 * @returns {Object} retorna uma resposta a solicitação para criar um evento de acesso a pagina landing page 
 */
export async function createEventIniciateCheckout(): Promise<object | void>{
    const response = await axios.post(`${API_URL}/facebook_event/iniciate_checkout`).catch(err => console.error(err));

    return response;
}