import { ReactElement } from "react"
import { twMerge } from "tailwind-merge"

interface Container {
    children: ReactElement[] | ReactElement
    title: string
    className?: string
}

export function Container({ children, title, className }: Container) {

    return (
        <div
            className={twMerge("w-full h-full overflow-hidden flex flex-col gap-4 justify-center items-start bg-light dark:bg-dark rounded-xl border border-primary-300 relative", className)}
        >
            <h2 className="w-full text-dark dark:text-light text-2xl font-semibold uppercase p-4 px-8">{title}</h2>
            {children}
        </div>
    )
};