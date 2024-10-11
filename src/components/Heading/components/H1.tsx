import { twMerge } from "tailwind-merge"
import { Heading } from "../Heading"


export function H1({className, children, ...props }: Heading) {
    return (
        <h1
            className={twMerge("flex justify-center items-center gap-2 text-xl font-bold text-light", className)}
            {...props}
        >{children}</h1>
    )
};