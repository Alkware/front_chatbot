import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Title {
    children: string | ReactElement;
    className?: string;
}

export function SubTitle({ children, className }: Title) {
    return (
        <h2
        className={twMerge("text-lg text-center md:text-xl opacity-70 text-dark dark:text-light ", className)}
        >{children}</h2>
    )
};