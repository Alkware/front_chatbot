import { ReactNode } from "react"

interface LiTypes {
    text: string,
    index: string,
    icon: ReactNode,
    onClick: ({ target }: any) => void,
}

export function Li({ text, index, icon, onClick }: LiTypes) {

    return (
        <li
            className={
                `w-full flex gap-2 justify-center items-center text-center cursor-pointer py-4 border-b-[1px] border-zinc-500/50 hover:bg-zinc-500 
                transition-colors`
            }
            data-index={index}
            onClick={onClick}
        >
            {icon} {text}
        </li>
    )
};