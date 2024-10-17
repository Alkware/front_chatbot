export interface Image {
    id: string
    client_id: string

    url: string
    description: string

    created_at: Date
    updated_at: Date
}

export interface SaveImageInfo {
    client_id: string
    products_id?: string | null
    services_id?: string | null

    url?: string
    file_name?: string
    description: string
}
