import { FormEvent, ReactNode } from "react"

interface formTypes {
    onSubmit: (e: FormEvent<HTMLFormElement>)=> void,
    children: ReactNode
}


export function Form({ onSubmit, children }: formTypes) {

    return (
        <form
            onSubmit={onSubmit}
            className="w-full h-full px-12 bg-black flex flex-col items-center justify-center gap-4 animate-smooth_display_left"
        >
            { children }
        </form>
    )
};