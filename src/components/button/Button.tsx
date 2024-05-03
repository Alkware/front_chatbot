import { ButtonHTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string
}

export function Button({ children, customClass, ...restProps }: Button) {
    return (
        <button
            {...restProps}
            className={twMerge("py-2 px-6 flex justify-center items-center gap-1 bg-primary-100 text-light rounded-lg", customClass)}
            data-loading
        >
            {children}
        </button>
    )
};