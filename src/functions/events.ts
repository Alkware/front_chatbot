import { ProjectTypes } from "../@types/projectTypes";
import { getDollar } from "./convertDollarToReal";
import { formatLongNumber } from "./formatLongNumber";
var dollar: any;

(async ()=>{
    dollar = await getDollar();
})()

export function eventManager(project: ProjectTypes) {

    const output = project.metric.chat_event
        .reduce((total, chat) => total + chat.used_tokens.
            reduce((total, tokens) => total + tokens.output, 0), 0) || 0;

    const input = project.metric.chat_event
        .reduce((total, chat) => total + chat.used_tokens.
            reduce((total, tokens) => total + tokens.input, 0), 0) || 0;



    function getNumberChat() {
        return project.metric.chat_event.reduce((total, chats) => total + chats.open_chat.length, 0);
    }

    function getNumberUniqueChat() {

        const removeDuplicateGuest = project.metric.chat_event.filter((obj, index, self) =>
            index === self.findIndex((el) => el["guest_id"] === obj['guest_id'])
        ) || [];

        return removeDuplicateGuest.length
    }

    function getTotalTokens() {
        return formatLongNumber(output + input)
    }


    function getOutputTokens() {
        return formatLongNumber(output)
    }


    function getInputTokens() {
        return formatLongNumber(input)
    }

    function getInputWips() {
        return Number(input / 1000).toFixed(2).replace(".", ",")
    }

    function getOutputWips() {
        return Number(input / 1000).toFixed(2).replace(".", ",")
    }

    function getTotalWips() {
        return Number((input + output) / 1000).toFixed(2).replace(".", ",")
    }

    function getAmountSpentInReal() {
        const usedDollarToken = (input * 0.0010 / 1000) + (output * 0.0020 / 1000);
        const dollarToReal = "R$" + (dollar * usedDollarToken).toFixed(2).replace(".", ",")

        return dollarToReal
    }



    return {
        getNumberChat: getNumberChat(),
        getTotalTokens: getTotalTokens(),
        getNumberUniqueChat: getNumberUniqueChat(),
        getInputTokens: getInputTokens(),
        getOutputTokens: getOutputTokens(),
        getOutputWips: getOutputWips(),
        getInputWips: getInputWips(),
        getTotalWips: getTotalWips(),
        getAmountSpentInReal: getAmountSpentInReal()
    }
}