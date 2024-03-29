/**
 * URL DA LOGO DA WIPZEE
 */
export const URL_LOGO = "https://i.ibb.co/6gFGb2q/wipzee-logo-1-removebg-preview.png"
/**
 * Nome da etapa que ficará na url do navegador.
 * Esse nome da query serve para definir em qual etapa do formuláriuo o cliente está!
 */
export const STEP_NAME_URL: string = "form-step"
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
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS NO LOCALSTORAGE PARA NÃO HAVER PERDE DE DADOS.
 */
export const FORM_NAME_TO_SAVE_LOCALSTORAGE = "form-save-data"
/**
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS INSERIDOS NOS FORMULARIOS PARA CRIAÇÃO DE CHAT.
 */
export const CHAT_NAME_TO_SAVE_LOCALSTORAGE = "chat"
/**
 * NOME QUE SERÁ USADO PARA SALVAR TODOS OS DADOS INSERIDOS NOS FORMULARIOS PARA CRIAÇÃO DE DATABASE.
 */
export const DATABASE_NAME_TO_SAVE_LOCALSTORAGE = "database"
export const ERROR_NAME_TO_SAVE_LOCALSTORAGE = "forms-error"
/**
 * Quantidade máxima de container disponiveis para a criação de fontes de dados, esses containers
 * estão localizados em "myDatabase"
 */
export const MAX_CONTAINER_TO_CREATE_DATABASE = 9
export const MAX_AMOUNT_CTA_THAT_CAN_BE_CREATED = 5


import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { RiChatSmile2Fill, RiMessage2Fill, RiWhatsappFill } from "react-icons/ri";
import { BiSolidMessageDetail } from "react-icons/bi";
import { ElementType } from "react"

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
