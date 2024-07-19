export interface Guest {
    id: string,
    fullname: string[]
}

export interface CreateGuest {
    user_id?: string[],
    origin: string | null,
    first_access:  "PLATFORM" | "CHAT";
}