import { twMerge } from "tailwind-merge"
import { TextType } from "../Text"

export function Link({ children, className, ...props }: TextType) {
    return (
        <span
            className={twMerge("flex justify-center items-center gap-2 text-sm text-light underline cursor-pointer opacity-70", className)}
            {...props}
        >{children}</span>
    )
};