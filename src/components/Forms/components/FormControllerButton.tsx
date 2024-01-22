import React, { ReactElement } from "react"

interface FormControllerButton {
    children: ReactElement | ReactElement[]
    stepChildren?: any,
}

export function FormControllerButton({ children, stepChildren }: FormControllerButton) {

    return (
        <div>
            {
                React.Children.toArray(children).map((child: any, index: number) =>
                    React.cloneElement(child, { key: index, stepChildren })
                )
            }
        </div>
    )
};