import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../functions/formatDate";
import { Select } from "../Select/Select";

interface SelectTime {
    typeFilter: "filter_time_metric" | "filter_time_chats"
}

export function SelectTime({ typeFilter }: SelectTime) {
    const [searchParams, setSearchParams] =useSearchParams();


    const handleSelectTime = (id: string) => {
        const currentHour = formatDate(new Date()).currentHour
        var valueInHour = 0

        switch (id) {
            case "today":
                valueInHour = currentHour
                break;
            case "yesterday":
                valueInHour = currentHour + 24 //+ 24 horas
                break;
            case "last_7_days":
                valueInHour = currentHour + (6 * 24) // 6 dias * 24 horas 
                break;
            case "last_14_days":
                valueInHour = currentHour + (13 * 24) // 13 dias * 24 horas 
                break;
            case "last_month":
                valueInHour = currentHour + (29 * 24) // 13 dias * 24 horas 
                break;
            case "last_3_month":
                valueInHour = currentHour + (89 * 24) // 89 dias * 24 horas 
                break;
            case "last_6_month":
                valueInHour = currentHour + (179 * 24) // 179 dias * 24 horas 
                break;
            case "last_year":
                valueInHour = currentHour + (364 * 24) // 364 dias * 24 horas 
                break;
            default:
                valueInHour = 0 
                break;
        }

        const newUrlParams = new URLSearchParams(searchParams)
        newUrlParams.set(typeFilter, valueInHour.toString())
        setSearchParams(newUrlParams)

    }


    return (
        <Select
            onSelected={handleSelectTime}
            title="Selecione uma data"
            name="datetime"
            options={[
                { value: "today", text: "Hoje" },
                { value: "yesterday", text: "Ontem" },
                { value: "last_7_days", text: "Ultimos 7 dias" },
                { value: "last_14_days", text: "Ultimos 14 dias" },
                { value: "last_month", text: "Ultimo mês" },
                { value: "last_3_month", text: "Ultimos 3 meses" },
                { value: "last_6_month", text: "Ultimos 6 meses" },
                { value: "last_year", text: "Ultimo ano" }
            ]}
        />
    )
};