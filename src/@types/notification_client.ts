export interface Notification_client {
    id: string;
    read: boolean;
    notification: NotificationType;
    createad_at: string;
    updated_at: string;
}


export interface NotificationType {
    id: string;
    describe: string;
    title: string;
    code: string;
    is_global: string;
    cta_text: string;
    created_at: string;
    updated_at: string;
}
