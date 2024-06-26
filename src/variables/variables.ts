
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { RiChatSmile2Fill, RiMessage2Fill, RiWhatsappFill } from "react-icons/ri";
import { BiSolidMessageDetail } from "react-icons/bi";
import { ElementType } from "react"


/**
 * URL DA LOGO DA WIPZEE
 */
export const URL_LOGO = "https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png";
export const PREVIEW_IMAGE = "https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png"
/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome da query serve para definir em qual etapa do formuláriuo o cliente está!
 */
export const STEP_NAME_URL: string = "form-step"

/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome da query serve para definir qual é o atual topico que o ususário quer ver.
 */
export const TAB_NAME_URL = "tab";

/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome da query serve para definir qual é o atual topico que o ususário quer ver.
 */
export const FILTER_BY_PROJECT_NAME_URL = "project";
/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome da query serve para definir qual é o atual topico que o ususário quer ver.
 */
export const FILTER_BY_TIME_NAME_URL = "filter_time";
/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome é um controlador para verificar se o mobile menu está aberto ou fechado.
 */
export const RESIZE_MENU = {
    URL_NAME: "resize-menu",
    VALUE: "resized"
}

/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome é um controlador para verificar se o mobile menu está aberto ou fechado.
 */
export const PARAM_MENU_MOBILE = {
    url_name: "menu_mobile",
    default_values: {
        open: "open",
        close: "close"
    }
}
/**
 * Nome da atual cta que ficará na url do navegador.
 * Esse nome da query serve para definir qual é o atual button CTA exibido nos formulários.
 */
export const CTA_NAME_URL = "current-cta"
/**
 * Nome que ficará na url do navegador.
 * Esse nome da query serve para definir qual é o atual icone a ser exibido nos formulários.
 */
export const ICON_NAME_URL = "current-icon"
/**
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS INSERIDOS NOS FORMULARIOS PARA CRIAÇÃO DE CHAT.
 */
export const CHAT_NAME_TO_SAVE_LOCALSTORAGE = "chat"
/**
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS INSERIDOS NOS FORMULARIOS PARA CRIAÇÃO DE DATABASE.
 */
export const DATABASE_NAME_TO_SAVE_LOCALSTORAGE = "database"
export const COMPANY_NAME_TO_SAVE_LOCALSTORAGE = "company_info"
export const ERROR_NAME_TO_SAVE_LOCALSTORAGE = "forms-error"
/**
 * Quantidade máxima de container disponiveis para a criação de fontes de dados, esses containers
 * estão localizados em "myDatabase"
 */
export const MAX_CONTAINER_TO_CREATE_CHAT = 6
export const MAX_CONTAINER_TO_CREATE_DATABASE = 8
export const MAX_AMOUNT_CTA_THAT_CAN_BE_CREATED = 5


/**
 * Modelo para icone do widget do usuário
 * OBS: Não pode haver um id com o numero 0 para evitar conflitos em comparação de dados, já que o 0 é falsiano.
 */
export const CHAT_ICONS_MODELS: Array<{ id: number, Icon: ElementType }> = [
    {
        id: 1,
        Icon: RiMessage2Fill
    },
    {
        id: 2,
        Icon: BiSolidMessageDetail
    },
    {
        id: 3,
        Icon: RiWhatsappFill
    },
    {
        id: 4,
        Icon: FaFacebookMessenger
    },
    {
        id: 5,
        Icon: FaTelegram
    },
    {
        id: 6,
        Icon: RiChatSmile2Fill
    },
]
