import { ReactNode } from "react"

interface ContainerListSelect {
    children: ReactNode;
}

export function ContainerListSelect({ children }: ContainerListSelect) {
    return (
        <ul
            data-id="container-select"
            className="w-full max-h-[160px] overflow-auto hidden flex-col items-center absolute top-full z-40 bg-light dark:bg-black text-primary-100 dark:text-light border border-primary-100"
        >
            {children}
        </ul>
    )
};