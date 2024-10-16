import { twMerge } from "tailwind-merge"
import { TextType } from "../Text"

export function H3({ children, className, ...props }: TextType) {
    return (
        <h3
            className={twMerge("flex justify-center items-center gap-2 text-base text-light", className)}
            {...props}
        >{children}</h3>
    )
};