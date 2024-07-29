import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Title {
    children: string | ReactElement;
    className?: string
}

export function Title({ children, className }: Title) {
    return (
        <h2
            className={twMerge("text-xl md:text-2xl text-center opacity-90 text-dark dark:text-light ", className)}
        >{children}</h2>
    )
};