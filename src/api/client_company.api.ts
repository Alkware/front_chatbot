import axios from "axios";
import { API_URL } from "./url-api";
import { Client_Company, Info_Client_Company } from "../@types/clientCompany.types";
import { createLog } from "./log";

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



/**
 * Função responsável por atualizar uma empresa para o cliente.
 * @param {Info_Client_Company} company Informações da empresa a serem atualizadas.
 * @returns {Client_Company} Retorna um objeto com todas as informações atualizadas
 */
export async function updateClientCompany(company: Info_Client_Company): Promise<Client_Company | void> {

    const response = await axios.put(`${API_URL}/company/update`, company).catch(err => console.error(err));

    if (!response) {
        createLog({
            level: "warning",
            log: "Não foi possivel atualizar os dados da empresa do usuário ao atualizar a IA",
            path: "src/api/client_company.api.ts",
            sector: "Plataforma"
        });
        return;
    };

    return response.data;
}

/**
 * Função responsável por deletar as informações da empresa do usuário no banco de dados.
 * @param id Id unico da empresa do cliente.
 * @returns {Client_Company} Retorna as informações deletadas da empresa do client
 */
export async function deleteClientCompany(id: string): Promise<Client_Company | void> {
    
    const response = await axios.delete(`${API_URL}/company/delete/${id}`).catch(err => console.error(err));

    if(!response) return;

    return response.data;
}