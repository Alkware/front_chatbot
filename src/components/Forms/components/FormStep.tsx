import React, { ReactElement } from "react"
import { useSearchParams } from "react-router-dom";
import { Project } from "../../../@types/Project";

export interface FormStep {
    children: ReactElement | ReactElement[],
    index: number,
    formName?: string
    project?: Project
}

export function FormStep({ children, formName, index, project }: FormStep) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get("form-step")) || 0;
    const childrenToArray = React.Children.toArray(children)

    return (
        <div
            data-display={currentStep === index}
            className="flex-col gap-12 data-[display='true']:flex hidden"
        >
            {childrenToArray.map((child: any, i: number) =>
                React.cloneElement(child, { key: i, index, formName, project })
            )}
        </div>
    )
};