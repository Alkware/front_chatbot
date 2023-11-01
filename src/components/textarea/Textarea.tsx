import { HTMLProps } from "react";

export function Textarea(restProps: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea 
            cols={30} 
            rows={10}
            className="bg-zinc-600 p-2 rounded-md w-full text-zinc-200 outline-none"
            {...restProps}
        ></textarea>
    )
};