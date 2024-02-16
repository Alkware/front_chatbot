import React, { ReactElement } from "react"
import { useSearchParams } from "react-router-dom";
import { STEP_NAME_URL } from "../../../../variables/variables";

export interface FormEditStep {
    children: ReactElement | ReactElement[];
    index: number;
    titleStep: string;
    icon?: ReactElement;
}

export function FormEditStep({ children, index, titleStep }: FormEditStep) {
    const [params] = useSearchParams();
    const currentStep = Number(params.get(STEP_NAME_URL)) || 0;
    const childrenToArray = React.Children.toArray(children)

    return (
        <div
            data-display={currentStep === index}
            className="w-full flex-col gap-8 data-[display='true']:flex hidden"
        >
            <h2
                className="w-full text-center text-2xl font-bold mb-4"
            >{titleStep}</h2>

            {childrenToArray.map((child: any, i: number) =>
                React.cloneElement(child, { key: i, index })
            )}
        </div>
    )
};