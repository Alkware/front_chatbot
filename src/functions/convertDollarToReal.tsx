import axios from "axios";

export async function getDollar() {
    const taxa = await axios.get('https://open.er-api.com/v6/latest/USD');
    return  taxa.data.rates.BRL
}

export async function convertDollarToReal(dollar: number) {
    const dolar = await getDollar() || 0;

    const convertDollarToReal = (dollar * dolar).toFixed(2).replace(".", ",")

    return convertDollarToReal
}


