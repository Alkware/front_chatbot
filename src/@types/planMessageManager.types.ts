export interface PlanMessageManager {
    id: string

    input: number;
    output: number;
    lead_collected: Lead_collected[];
    messages: Message[];
    historic_messages: Message[];

    created_at: string;
}

export interface Lead_collected {
    email?: string;
    name?: string;
    cell_phone?: string;
    time: Date;
}

export interface Message {
    player: 0 | 1 | 2;
    message: string;
    time: string;
}