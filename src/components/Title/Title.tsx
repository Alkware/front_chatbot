import { HtmlHTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Title extends HtmlHTMLAttributes<HTMLHeadingElement>{
    children: string | ReactElement;
    className?: string
}

export function Title({ children, className, ...props }: Title) {
    return (
        <h2
            {...props}
            className={twMerge("text-lg md:text-xl text-center opacity-90 text-dark dark:text-light", className)}
        >{children}</h2>
    )
};