import { ReactNode } from "react"

interface ContainerListSelect {
    children: ReactNode;
}

export function ContainerListSelect({ children }: ContainerListSelect) {
    return (
        <ul
            data-id="container-select"
            className="w-full max-h-[140px] md:max-h-[200px] overflow-auto hidden flex-col items-center absolute top-full z-50 bg-light dark:bg-black text-primary-100 dark:text-light border border-primary-100"
        >
            {children}

        </ul>
    )
};