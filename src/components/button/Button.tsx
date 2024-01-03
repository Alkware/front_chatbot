import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonMain extends ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string
}

export function Button({ children, customClass, ...restProps }: ButtonMain) {
    return (
        <button
            {...restProps}
            className={twMerge("px-4 p-2 flex justify-center items-center gap-1 bg-primary-100 text-light rounded-3xl", customClass)}
        >
            {children}
        </button>
    )
};