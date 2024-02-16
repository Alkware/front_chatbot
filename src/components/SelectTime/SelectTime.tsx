import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../functions/formatDate";
import { Select } from "../Select/Select";
import { IoCalendar } from "react-icons/io5";

interface Times {
    value: "today" | "yesterday" | "last_7_days" | "last_14_days" |
    "last_month" | "last_3_month" | "last_6_month" | "last_year"
}

interface SelectTime {
    typeFilter: "filter_time_metric" | "filter_time_chats"
}

export function SelectTime({ typeFilter }: SelectTime) {
    const [searchParams, setSearchParams] =useSearchParams();


    const handleSelectTime = ({ target }: any) => {
        const currentHour = formatDate(new Date()).currentHour
        const select = target;
        const { value }: Times = target.options[select.selectedIndex];
        var valueInHour = 0

        switch (value) {
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
            handleSelectDatabase={handleSelectTime}
            Icon={IoCalendar}
            options={[
                { id: "0", name: "Todas as datas"},
                { id: "today", name: "Hoje" },
                { id: "yesterday", name: "Ontem" },
                { id: "last_7_days", name: "Ultimos 7 dias" },
                { id: "last_14_days", name: "Ultimos 14 dias" },
                { id: "last_month", name: "Ultimo mês" },
                { id: "last_3_month", name: "Ultimos 3 meses" },
                { id: "last_6_month", name: "Ultimos 6 meses" },
                { id: "last_year", name: "Ultimo ano" }
            ]}
        />
    )
};