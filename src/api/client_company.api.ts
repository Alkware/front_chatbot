import axios from "axios";
import { API_URL } from "./url-api";
import { Client_Company, Info_Client_Company } from "../@types/clientCompany.types";

/**
 * Função responsável por buscar as informações da empresa do cliente baseado no id.
 * @param company_id Id único da empresa do cliente.
 * @returns {Client_Company} Retorna as informações da empresa do usuário
 */
export async function getCompany(company_id: string): Promise<Client_Company | void> {

    const response = await axios.get(`${API_URL}/company/${company_id}`).catch(err => console.error(err));

    if (!response) return;

    return response.data;
}

/**
 * Função responsável por criar uma nova empresa para o cliente.
 * @param {Info_Client_Company} company Informações da empresa a serem criadas.
 * @returns {Client_Company} Retorna um objeto com todas as informações atualizadas
 */
export async function createClientCompany(company: Info_Client_Company): Promise<Client_Company | void> {

    if (!company.company_name &&
        !company.company_description &&
        !company.contact_email &&
        !company.contact_phone_number) return;

    const response = await axios.post(`${API_URL}/company/create`, company).catch(err => console.error(err));

    if (!response) return;

    return response.data;
}