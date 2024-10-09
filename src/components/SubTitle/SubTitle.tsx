import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Title {
    children: string | ReactElement;
    className?: string;
}

export function SubTitle({ children, className }: Title) {
    return (
        <h3
            className={twMerge("text-base text-center text-dark dark:text-light", className)}
        >{children}</h3>
    )
};