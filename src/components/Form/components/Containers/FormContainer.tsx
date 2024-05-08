import { HTMLAttributes, ReactElement } from "react"

interface FormContainer extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    title?: string;
    hiddenContainer?: boolean
}

export function FormContainer({ children, title, hiddenContainer, ...props }: FormContainer) {
    return (
        <div 
            data-hidden={hiddenContainer}
            className="flex flex-col justify-center data-[hidden=true]:hidden"
        >
            <h2
                data-istitle={!!title}
                className="mb-3 text-xl font-bold data-[istitle='false']:hidden text-center md:text-left"
            >{title}</h2>
            <div
                {...props}
            >
                {children}
            </div>
        </div>
    )
};