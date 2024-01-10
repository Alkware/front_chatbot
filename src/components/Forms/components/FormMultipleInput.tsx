import React, { ReactElement, useState } from "react"
import { ToggleComponent } from "../../Toggle/Toggle"

interface FormMultipleInput {
    children: ReactElement[],
    optional?: {
        active: boolean,
        text: string
    }
    register?: any,
    setValue?: any
}

export function FormMultipleInput({ children, optional, register, setValue }: FormMultipleInput) {
    const [display, setDisplay] = useState(optional?.active ? true : false);
    const childrenToArray = React.Children.toArray(children)

    const handleActiveCTA = (prop: any) => {
        return new Promise((resolve) => {
            if (prop === false) {
                children.forEach((child) => {
                    if (children.find(child => child.props.fieldName.includes("button_text"))) {
                        setValue(child.props.fieldName, "")
                    }
                })
                setDisplay(false)
            }
            else setDisplay(true)
            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="flex flex-col gap-4">

            <h2
                className="flex gap-4"
            >
                {optional?.text}
                <ToggleComponent
                    cb={handleActiveCTA}
                    isActive={optional?.active}
                />
            </h2>

            <div
                data-display={display}
                className="data-[display='false']:hidden flex justify-between items-center gap-8"
            >
                {childrenToArray.map((child: any, index: number) => React.cloneElement(child, { key: index, register }))}
            </div>
        </div>
    )
};