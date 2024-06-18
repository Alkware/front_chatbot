import { ReactNode } from "react"

interface LiTypes {
    text: string,
    index: number,
    onClick: ({ target }: any) => void,
    icon?: ReactNode,
}

export function Li({ text, index, icon, onClick }: LiTypes) {

    return (
        <li
            data-index={index}
            className="w-full flex gap-2 justify-center md:justify-start items-center text-center cursor-pointer py-3 transition-colors whitespace-nowrap text-ellipsis overflow-hidden"
            onClick={onClick}
        >
            {icon} {text}
        </li>
    )
};