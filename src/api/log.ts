import axios from "axios";
import { Log } from "../@types/log.types";
import { API_URL } from "./url-api";

// Rota para criar um novo log...
export async function createLog({ log, sector, level, path }: Log){

    const response = await axios.post(`${API_URL}/log/create`, { log, sector, level, path }).catch(err => console.error(err));

    return response

}