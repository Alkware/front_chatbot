import { HTMLAttributes, ReactElement } from "react"

interface FormContainer extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    title?: string;
}

export function FormContainer({ children, title, ...props }: FormContainer) {
    return (
        <div className="flex flex-col justify-center">
            <h2
                data-istitle={!!title}
                className="mb-3 text-xl font-bold data-[istitle='false']:hidden"
            >{title}</h2>
            <div
                {...props}
            >
                {children}
            </div>
        </div>
    )
};