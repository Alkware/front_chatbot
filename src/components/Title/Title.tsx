import { HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Title extends HtmlHTMLAttributes<HTMLHeadingElement>{
    children: any;
    className?: string
}

export function Title({ children, className, ...props }: Title) {
    return (
        <h2
            {...props}
            className={twMerge("flex justify-center items-center gap-2 text-lg md:text-xl text-center opacity-90 text-dark dark:text-light", className)}
        >{children}</h2>
    )
};