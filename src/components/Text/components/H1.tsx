import { twMerge } from "tailwind-merge"
import { TextType } from "../Text"


export function H1({className, children, ...props }: TextType) {
    return (
        <h1
            className={twMerge("flex justify-center items-center gap-2 text-xl font-bold text-light", className)}
            {...props}
        >{children}</h1>
    )
};