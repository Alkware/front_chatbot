import { MouseEventHandler, ReactNode } from "react"

export interface buttonTypes {
    children: string
    text?: string,
    icon?: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}
