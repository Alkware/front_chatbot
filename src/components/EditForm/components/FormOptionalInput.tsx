import React, { ReactElement, useState } from "react"
import { ToggleComponent } from "../../Toggle/Toggle"
import { STEP_NAME_URL } from "../../../variables/variables"
import { useSearchParams } from "react-router-dom"
import { Project } from "../../../@types/Project"

interface FormOptionalInput {
    children: ReactElement[] | ReactElement,
    optional?: {
        optional: boolean,
        active: boolean,
        text: string
    },
    fieldName: string,
    formName?: string
    index?: number,
    project?: Project
}

export function FormOptionalInput({ children, optional, fieldName, formName, index }: FormOptionalInput) {
    const [display, setDisplay] = useState(optional?.active);
    const childrenToArray = React.Children.toArray(children)
    const [params, setParams] = useSearchParams();

    const handleActiveCTA = (prop: any) => {
        if (!formName) throw new Error("FormName is missing")
        // busca o formulario no localStorage
        const formData = JSON.parse(localStorage.getItem(formName) || "{}")
        // busca a atual step do formulario
        const currentStep = params.get(STEP_NAME_URL) || "0";
        if (!currentStep) throw new Error("The current step not founded.")
        //aumenta uma ação no formulario, forçando a atualização do simulador do chat
        const actions = params.get("actions");
        const increaseActions = Number(actions) + 1;
        params.set("actions", increaseActions.toString());
        setParams(params)

        //retorna uma promisse se o toggle será off ou on
        return new Promise((resolve) => {

            if (prop === false) {
                delete formData[currentStep][fieldName]
                setDisplay(false)
            } else {
                childrenToArray.forEach((_) => {
                    if (index === null || index === undefined) throw new Error("Index is missing!")
                })
                setDisplay(true)
            }

            localStorage.setItem(formName, JSON.stringify(formData))
            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="flex flex-col">

            <h2
                data-isoptional={optional?.optional}
                className="hidden data-[isoptional=true]:flex gap-4"
            >
                {optional?.text}
                <ToggleComponent
                    cb={handleActiveCTA}
                    template="yesNo"
                    isActive={display}
                />
            </h2>

            <div
                data-display={display}
                className="data-[display='false']:hidden flex justify-between items-center gap-8"
            >
                {childrenToArray.map((child: any, index: number) => React.cloneElement(child, { key: index, formName }))}
            </div>
        </div>
    )
};