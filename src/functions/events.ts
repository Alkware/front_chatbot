import { Project } from "../@types/Project";
import { convertDateInHour } from "./convertDateInHour";
import { formatDate } from "./formatDate";

export function eventManager(project: Project, time: number = 0) {


    // Obtem o número de chats abertos...
    function getNumberChat() {
        const openChats = project.metric?.chat_event.reduce((total, ev) => {

            const chatsFiltered = ev.open_chat.filter(chat => {
                const hoursDifference = convertDateInHour(chat.created_at)
                return time > 0 ? hoursDifference <= time : true
            })

            return total + chatsFiltered.length
        }, 0)

        return openChats || 0;
    }

    // Obtem o número de chats unicos abertos, ou seja chats abertos por dispositivos diferentes
    function getNumberUniqueChat() {
        const filterTimeChats = project.metric?.chat_event.filter((chat) => {
            const hoursDifference = convertDateInHour(chat.created_at)
            return time > 0 ? hoursDifference <= time : true
        }) || [];


        const removeDuplicateGuest = filterTimeChats.filter((chats, index, self) => {
            return index === self.findIndex((el) => el["guest_id"] === chats['guest_id'])
        })

        return removeDuplicateGuest.length
    }

    // Obtem a quantidade de mensagem enviadas para IA...
    function getInputMessages() {
        // Filtra todas as mensagens baseado no tempo
        const messages = project.plan_message_manager.map((manager) => {
            const filteredMessage = manager.messages.filter(msg => {
                const hoursDifference = convertDateInHour(msg.time)
                return time > 0 ? hoursDifference <= time : true
            })
            return filteredMessage
        })

        return messages.flat().filter(msg => msg.player === "user").length
    }

    // Obtem a quantidade de mensagem enviadas pela IA...
    function getOutputMessages() {
        // Filtra todas as mensagens baseado no tempo
        const messages = project.plan_message_manager.map((manager) => {
            const filteredMessage = manager.messages.filter(msg => {
                const hoursDifference = convertDateInHour(msg.time)
                return time > 0 ? hoursDifference <= time : true
            })
            return filteredMessage
        })


        return messages.flat().filter(msg => msg.player === "assistant").length
    }

    // Obtem a média de mensagem enviada por chat...
    function getMediaMessagesByChat() {
        const totalMessages = getInputMessages() + getOutputMessages();
        const mediaMessagesByChat = getNumberUniqueChat() > 0 ? (totalMessages / getNumberUniqueChat()) : 0
        return mediaMessagesByChat % 1 === 0 ? mediaMessagesByChat : Number(mediaMessagesByChat.toFixed(1))
    }

    // Obtem o tempo de uso do chat...
    function getUsageTime() {

        const milliseconds = project.metric?.chat_event.reduce((total, ev) => {

            const chatsFiltered = ev.chat_time.filter(chat => {
                const hoursDifference = convertDateInHour(chat.created_at)
                return time > 0 ? hoursDifference <= time : true
            })

            return total + (chatsFiltered.reduce((total, chats) => {
                if (!chats.closed_at && !chats.created_at) return 0
                const timeDifference = Number(new Date(chats.closed_at)) - Number(new Date(chats.created_at))
                return total + timeDifference
            }, 0))

        }, 0)

        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const formattedTime = `${hours.toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

        return formattedTime
    }

    // Obtem a média de tempo de uso por chat...
    function getMediaUsageTime() {
        const totalMilliseconds = project.metric?.chat_event.reduce((total, ev) => {
            const chatsFiltered = ev.chat_time.filter(chat => {
                const hoursDifference = convertDateInHour(chat.created_at)
                return time > 0 ? hoursDifference <= time : true
            })

            return total + (chatsFiltered.reduce((total, chats) => {
                if (!chats.closed_at && !chats.created_at) return 0
                const timeDifference = Number(new Date(chats.closed_at)) - Number(new Date(chats.created_at))
                return total + timeDifference
            }, 0))
        }, 0)

        const milliseconds = totalMilliseconds > 0 ? totalMilliseconds / getNumberUniqueChat() : 0;

        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const formattedTime = `${hours.toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

        return hours !== Infinity ? formattedTime : "00:00:00"
    }

    // Obtem a quantidade de cliques no link...
    function getClicksLink() {
        const buttons = project.metric?.button_event.filter((ev: any) => {
            const hoursDifference = convertDateInHour(ev)
            return time > 0 ? hoursDifference <= time : true
        }, 0)

        return buttons?.reduce((total: number, btn) => total + btn.clicked_button.length, 0) || 0;
    }

    // Obtem a quantidade de cliques no link...
    function getLeadsCollected() {
        // Filtra todas as mensagens baseado no tempo
        const messages = project.plan_message_manager.map((manager) => {
            // const filteredMessage = manager.lead_collected.filter(lead => {
            //     const hoursDifference = convertDateInHour(lead.time)

            //     return time > 0 ? hoursDifference <= time : true
            // })
            return manager.lead_collected
        })

        return messages.flat().length
    }

    // Obtem a data que o chat foi criado...
    function getCreatedAt() {
        return formatDate(project.created_at).dateFormat_A
    }

    return {
        IS_ONLINE: project.is_online || false,
        NAME: project.project_name,
        CAT: getNumberChat(),
        CAU: getNumberUniqueChat(),
        MESSAGE_INPUT: getInputMessages(),
        MESSAGE_OUTPUT: getOutputMessages(),
        MESSAGES_TOTAL: (getInputMessages() + getOutputMessages()),
        MEDIA_MESSAGES_CHAT: getMediaMessagesByChat(),
        USAGE_TIME: getUsageTime(),
        MEDIA_USAGE_TIME: getMediaUsageTime(),
        CREATED_AT: getCreatedAt(),
        LINK_CLICKS: getClicksLink(),
        LEADS_COLLECTED: getLeadsCollected(),
        SERVICE_NOTE: 0,
        RESOLUTION_RATE: 0,
    }
}

