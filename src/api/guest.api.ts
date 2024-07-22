import axios from "axios";
import { API_URL } from "./url-api";

/**
 * Função responsável por enviar os dados do convidado para o back-end
 * @param {URLSearchParams} searchParams Origem do tráfego do convidado.
 * @returns {Promise<string | undefined>} Retorna uma string com o id do convidado.
 */
export async function saveGuest(searchParams: URLSearchParams): Promise<string | undefined> {
    var guest_id = localStorage.guestId;
    var origin = searchParams.get("tag")

    // Verifica se tem um id do convidado salvo no localstorage...
    if (guest_id && origin) {
        await axios.put(`${API_URL}/guest/update/origin/${guest_id}`, { origin }).catch(err => console.error(err));
        searchParams.delete("tag");
    }

    // caso não exista guest_id, será enviado as informações para ser validado o convidado
    // -- Verificar se realmente não existe um convidado no banco de dados, 
    // -- caso existir será retornado as informações existente, caso não será criado um novo registro...
    const response = await axios.post(`${API_URL}/guest/validate`, {
        first_access: "PLATFORM",
        origin,
    }).catch(err => console.error(err));

    // Se caso falhar...
    if (!response) {
        console.error("Unable to save new guest id to localstorage");
        return;
    }

    // Salva o id do convidado na variavél guest_id
    guest_id = response.data.id;
    // Salva o id do convidado no localstorage
    localStorage.guestId = guest_id;
    // Salva a origem no localStorage para ser reutilizado em outra página...
    localStorage.origin = origin;
    
    return guest_id
}