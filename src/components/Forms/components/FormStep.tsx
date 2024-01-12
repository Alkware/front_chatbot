import React, { ReactElement } from "react"
import { useSearchParams } from "react-router-dom";

export interface FormStep {
    children: ReactElement | ReactElement[],
    index: number,
    chat?: any
}

export function FormStep({ children, index, chat }: FormStep) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get("form-step")) || 0;
    const childrenToArray = React.Children.toArray(children)


    return (
        <div
            data-display={currentStep === index}
            className="flex-col gap-12 data-[display='true']:flex hidden"
        >
            {childrenToArray.map((child: any, index: number) =>
                React.cloneElement(child, { key: index, chat })
            )}
        </div>
    )
};