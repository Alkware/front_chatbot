const months = [
    {
        short: "Jan",
        complete: "Janeiro"
    },
    {
        short: "Fev",
        complete: "Fevereiro"
    },
    {
        short: "Mar",
        complete: "Março"
    },
    {
        short: "Abr",
        complete: "Abril"
    },
    {
        short: "Mai",
        complete: "Maio"
    },
    {
        short: "Jun",
        complete: "Junho"
    },
    {
        short: "Jul",
        complete: "Julho"
    },
    {
        short: "Ago",
        complete: "Agosto"
    },
    {
        short: "Set",
        complete: "Setembro"
    },
    {
        short: "Out",
        complete: "Outubro"
    },
    {
        short: "Nov",
        complete: "Novembro"
    },
    {
        short: "Dez",
        complete: "Dezembro"
    },
]

export function formatDate(data: string | Date = new Date()) {
    const date = new Date(data)
    date.toLocaleTimeString("pt-BR", { hour12: false })
    const fusoDifference = date.getTimezoneOffset();


    const currentMonth = date.getMonth();
    const currentHour = date.getUTCHours() - fusoDifference / 60;
    const fullDate = date.toLocaleDateString()
    const fullHour = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    const shortHour = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    const dateFormat_A = `${date.getDay()} de ${months[currentMonth].short} - ${shortHour}`

    return {
        currentHour,
        fullDate,
        fullHour,
        shortHour,
        dateFormat_A,
        fullDateWithHour: `${fullDate} - ${fullHour}`,
    }
}