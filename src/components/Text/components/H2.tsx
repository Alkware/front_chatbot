import { twMerge } from "tailwind-merge"
import { TextType } from "../Text"


export function H2({ children, className, ...props }: TextType) {
    return (
        <h2
            className={twMerge("flex justify-center items-center gap-2 text-lg font-medium text-light", className)}
            {...props}
        >{children}</h2>
    )
};