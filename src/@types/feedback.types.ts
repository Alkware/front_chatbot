import { Client } from "./Client.types";
import { Guest } from "./guest.types";

export interface Feedback {
    id: string
    guest_id?: string;
    client_id?: string;

    topic: string;
    rating: number;
    message?: string;

    guest?: Guest;
    client?: Client;

    created_at: Date
    updated_at: Date
}


export type CreateFeedback = Omit<Feedback, "id" | "created_at" | "updated_at">;