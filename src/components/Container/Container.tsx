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
            className={twMerge("w-full flex flex-col justify-center items-start p-8 bg-light dark:bg-dark rounded-xl border border-primary-300 relative", className)}
        >
            <h2 className="w-full mb-8 text-dark dark:text-light text-2xl font-semibold uppercase">{title}</h2>
            {children}
        </div>
    )
};