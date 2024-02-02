import { ReactElement } from "react"

interface FormFlex {
    flexDirection: "row" | "column";
    children: ReactElement | ReactElement[];
    title?: string;
}

export function FormFlex({ flexDirection, children, title }: FormFlex) {
    return (
        <div className="flex flex-col justify-center">
            <h2
                data-istitle={!!title}
                className="mb-3 text-xl font-bold data-[istitle='false']:hidden"
            >{title}</h2>
            <div
                data-isrow={flexDirection === "row"}
                className="flex data-[isrow='true']:flex-row flex-col gap-6 justify-start items-center"
            >
                {children}
            </div>
        </div>
    )
};