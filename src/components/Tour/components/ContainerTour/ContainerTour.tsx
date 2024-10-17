import { ReactElement } from "react"

interface ContainerTour { 
    children: ReactElement[]
}

export function ContainerTour({ children }: ContainerTour) {
    return (
        <div
            className="fixed z-10 top-0 right-0 w-screen md:w-[60vw] h-screen flex justify-end items-center transition-transform group-data-[show=false]:translate-x-[calc(100vw_-_2.5rem)] md:group-data-[show=false]:translate-x-[calc(60vw_-_2.5rem)]"
        >{children}</div>
    )
};