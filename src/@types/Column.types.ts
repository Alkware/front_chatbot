export interface Columns {
    key: 
        "IS_ONLINE" | "NAME" | "CAT" | "CAU" | 
        "TOKEN_INPUT" | "TOKEN_OUTPUT" | "TOKEN_TOTAL" |
        "MESSAGE_INPUT" | "MESSAGE_OUTPUT" | "MESSAGES_TOTAL" | 
        "USED_REAL" | "MEDIA_MESSAGES_CHAT" | "CREATED_AT" | "USAGE_TIME"| "MEDIA_USAGE_TIME" |
        "LINK_CLICKS" | "LEADS_COLLECTED" | "SERVICE_NOTE" | "RESOLUTION_RATE", 
    columnName: string,
    status: boolean,
    dataType: string
}