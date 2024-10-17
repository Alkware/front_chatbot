import { ReactElement } from "react"

interface ContentTour { 
    children: ReactElement[]
}

export function ContentTour({ children }: ContentTour) {
    return (
        <div
            className="w-full h-full bg-primary-100 dark:bg-primary-200 border-l-2 border-primary-50 p-4 overflow-y-auto py-8 "
        >
            {children}
        </div>
    )
};