export interface Image {
    id: string
    client_id: string

    url: string
    description: string

    created_at: Date
    updated_at: Date
}

export interface Images_products_services {
    id: string
    image_id: string
    product_id: string | null
    service_id: string | null

    image: Image;

    created_at: Date
    updated_at: Date
}


export interface SaveImageInfo {
    client_id: string
    products_id?: string | null
    services_id?: string | null

    url?: string
    description: string
}
