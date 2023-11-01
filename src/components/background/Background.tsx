import { ReactNode } from "react"

interface backgroundTypes {
    children: ReactNode
}

export function Background({ children }: backgroundTypes) {
    return (
        <div
            className="w-full h-full backdrop-blur-sm absolute top-0 right-0 flex justify-end overflow-hidden"
        >
            { children }
        </div>
    )
};