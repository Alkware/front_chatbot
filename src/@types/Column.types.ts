export interface Columns {
    key: 
        "IS_ONLINE" | "NAME" | "CAT" | "CAU" | 
        "MESSAGE_INPUT" | "MESSAGE_OUTPUT" | "MESSAGES_TOTAL"
        | "MEDIA_MESSAGES_CHAT" | "CREATED_AT" | "USAGE_TIME"| "MEDIA_USAGE_TIME" |
        "LINK_CLICKS" | "LEADS_COLLECTED" ,
    columnName: string,
    status: boolean,
    size: number;
    dataType: string
}