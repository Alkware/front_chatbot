import { HTMLAttributes, ReactElement } from "react"
import { twMerge } from "tailwind-merge";

interface FeedbackContainer extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    flex?: "flex-row" | "flex-col";
    className?: string;
}

function FeedbackContainer({ children, flex, className, ...props }: FeedbackContainer) {
    return (
        <div
            className={twMerge("flex items-center gap-1", flex, className)}
            {...props}
        >{children}</div>
    )
};

export const FeedbackComponents = {
    Container: FeedbackContainer,
}