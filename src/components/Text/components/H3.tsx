import { twMerge } from "tailwind-merge"
import { Text } from "../Text"

export function H3({ children, className, ...props }: Heading) {
    return (
        <h3
            className={twMerge("flex justify-center items-center gap-2 text-base text-light", className)}
            {...props}
        >{children}</h3>
    )
};