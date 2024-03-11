export interface Notification_client {
    id: string;
    read: boolean;
    notification: NotificationType;
    createad_at: string;
    updated_at: string;
}


export interface NotificationType {
    id: string;
    call_to_action: Notification_call_to_action;
    describe: string;
    title: string;
    created_at: string;
    updated_at: string;
}

export interface Notification_call_to_action{
    text: string,
    link: string,
}