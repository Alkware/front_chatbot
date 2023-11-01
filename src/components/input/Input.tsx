import { HTMLProps } from "react"

export function Input(restProps: HTMLProps<HTMLInputElement>) {
    return (
        <input
            className="bg-zinc-600 p-2 rounded-md w-full text-zinc-200 outline-none"
            {...restProps}
        />
    )
};