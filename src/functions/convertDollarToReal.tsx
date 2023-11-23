import axios from "axios";

export async function convertDollarToReal(dollar: number) {
    const taxa = await axios.get('https://open.er-api.com/v6/latest/USD');

    const convertDollarToReal = (dollar *taxa.data.rates.BRL).toFixed(2).replace(".", ",")

    return convertDollarToReal
}