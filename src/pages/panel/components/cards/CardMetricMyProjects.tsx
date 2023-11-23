import { useEffect, useState } from "react";
import { Metric } from "../../../../@types/projectTypes";
import { formatLongNumber } from "../../../../functions/formatLongNumber";
import { convertDollarToReal } from "../../../../functions/convertDollarToReal";

interface EventsMetric {
    openChatSize: number,
    totalToken: string,
    usedTotalReal: string
}

export function CardMetricMyProjects({ metric }: { metric: Metric }) {

    const [events, setEvents] = useState<EventsMetric>();

    useEffect(() => {

        (async () => {
            const openChats = metric.chat_event.reduce((total, chats) =>  total += chats.open_chat.length, 0)
            const input_tokens = metric.chat_event.reduce(
                (total, chats) => total + chats.used_tokens.reduce(
                    (total, tokens) => total + tokens.input, 0
                ), 0
            )
            const output_tokens = metric.chat_event.reduce(
                (total, chats) => total + chats.used_tokens.reduce(
                    (total, tokens) => total + tokens.output, 0
                ), 0
            )

            const usedDollarToken = (input_tokens * 0.03) + (output_tokens * 0.06);

            const usedTotalReal = await convertDollarToReal((usedDollarToken * 0.000045))

            setEvents({
                openChatSize: openChats || 0,
                totalToken: formatLongNumber(input_tokens + output_tokens) || "0",
                usedTotalReal: usedTotalReal || "0"
            })
        })()
    }, [])

    return (
        events &&
        <div className="w-full flex flex-col justify-center">
            <h2>Chats abertos: {events.openChatSize}</h2>
            <h2>Tokens usados: {events.totalToken}</h2>
            <h2>Valor gasto: R$ {events.usedTotalReal}</h2>
        </div>
    )
};