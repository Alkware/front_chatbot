import { ReactNode } from "react"

interface LiTypes {
    text: string,
    index: number,
    icon: ReactNode,
    onClick: ({ target }: any) => void,
}

export function Li({ text, index, icon, onClick }: LiTypes) {

    return (
        <li
            className={
                `w-full flex gap-2 justify-center items-center text-center cursor-pointer py-3 rounded-2xl hover:bg-primary-200
                transition-colors`
            }
            data-index={index}
            onClick={onClick}
        >
            {icon} {text}
        </li>
    )
};