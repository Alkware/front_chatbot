import { twMerge } from "tailwind-merge"
import { Heading } from "../Heading"

export function H3({ children, className, ...props }: Heading) {
    return (
        <h3
            className={twMerge("flex justify-center items-center gap-2 text-base text-light", className)}
            {...props}
        >{children}</h3>
    )
};