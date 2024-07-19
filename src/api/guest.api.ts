import axios from "axios";
import { API_URL } from "./url-api";

/**
 * Função responsável por enviar os dados do convidado para o back-end
 * @returns {Promise<string | undefined>} Retorna uma string com o id do convidado.
 */
export async function saveGuest(): Promise<string | undefined> {
    const origin = localStorage.origin;
    var guest_id = localStorage.guestId;

    // Verifica se tem um id do convidado salvo no localstorage...
    if (guest_id && origin) {
        await axios.put(`${API_URL}/guest/update/origin/${guest_id}`, { origin }).catch(err => console.error(err));
        localStorage.removeItem("origin");
    }

    // caso não exista, será enviado as informações para ser criado o convidado...
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
    // Caso tenha um origem de trafego e o id do convidado, será atualizado a origem do trafego...

    return guest_id
}