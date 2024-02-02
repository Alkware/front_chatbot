import React, { ReactElement } from "react"
import { useSearchParams } from "react-router-dom";
import { Project } from "../../../@types/Project";

export interface FormStep {
    children: ReactElement | ReactElement[];
    index: number;
    formName?: string;
    project?: Project;
    titleStep?: string;
}

export function FormStep({ children, formName, index, project, titleStep }: FormStep) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get("form-step")) || 0;
    const childrenToArray = React.Children.toArray(children)

    return (
        <div
            data-display={currentStep === index}
            className="w-full flex-col gap-6 data-[display='true']:flex hidden"
        >
            <h2
                data-istitle={titleStep ? true : false}
                className="w-full text-center text-2xl font-bold data-[istitle='false']:hidden"
            >{titleStep}</h2>

            {childrenToArray.map((child: any, i: number) =>
                React.cloneElement(child, { key: i, index, formName, project })
            )}
        </div>
    )
};