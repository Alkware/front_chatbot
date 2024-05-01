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
            className={twMerge("w-full min-h-[70vh] flex flex-col gap-4 justify-start items-start bg-light dark:bg-dark rounded-xl border border-primary-100 dark:border-primary-300 relative hidden-scrollbar", className)}
        >
            <h2 className="w-full text-primary-100 dark:text-light text-2xl font-semibold uppercase p-4 px-8">{title}</h2>
            {children}
        </div>
    )
};