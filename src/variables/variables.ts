
/**
 * URL DA LOGO DA WIPZEE
 */
export const URL_LOGO = "https://i.ibb.co/NNPyzXc/bubble-tech-logo-1-removebg-preview.png"

export const STEP_NAME_URL: string = "form-step"
/**
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS INSERIDOS NOS FORMULARIOS PARA CRIAÇÃO DE CHAT.
 */
export const CHAT_NAME_TO_SAVE_LOCALSTORAGE = "chat"
export const DATABASE_NAME_TO_SAVE_LOCALSTORAGE = "database"

/**
 * MODELO PARA CRIAR CHAT
 */

export interface Models {
    chat: {
        project_name: string,
        logo: string | null,
        prompt_id: string | null,
        chat_input_message: Array<string>,
        call_to_action: []
    }
    database: {
        project_name: string,
        logo: string | null,
        prompt_id: string | null,
        chat_input_message: Array<string>,
        call_to_action: []
    }
}

export const MODELS: Models = {

    chat: {
        project_name: "Nome do chat",
        logo: null,
        prompt_id: null,
        chat_input_message: ["Sua primeira mensagem"],
        call_to_action: []
    },

    database: {
        project_name: "Nome do chat",
        logo: null,
        prompt_id: null,
        chat_input_message: ["Sua primeira mensagem"],
        call_to_action: []
    },

}


