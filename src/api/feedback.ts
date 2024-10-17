import axios from "axios";
import { CreateFeedback } from "../@types/feedback.types";
import { API_URL } from "./url-api";

export async function createFeedback(data: CreateFeedback) {

    const response = await axios.post(`${API_URL}/feedback/create`,data ).catch(err => console.error(err))

    if(!response) return;

    return response.data
}