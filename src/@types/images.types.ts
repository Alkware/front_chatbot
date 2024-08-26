export interface Image {
    id: string
    client_id: string
    products_id?: string | null
    services_id?: string | null

    url: string
    description: string

    created_at: Date
    updated_at: Date
}

export interface LinkedImage {
    image: Image
}


export interface SaveImageInfo {
    client_id: string
    products_id?: string | null
    services_id?: string | null

    url?: string
    description: string
}
