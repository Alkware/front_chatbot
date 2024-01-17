import React, { ReactElement, useEffect, useState } from "react"
import { ToggleComponent } from "../../Toggle/Toggle"
import { STEP_NAME_URL } from "../../../variables/variables"
import { useSearchParams } from "react-router-dom"
import { createFieldsLocalStorage } from "./FormContainer"
import { Project } from "../../../@types/Project"

interface FormMultipleInput {
    children: ReactElement[],
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

export function FormMultipleInput({ children, optional, fieldName, formName, index, project }: FormMultipleInput) {
    const [display, setDisplay] = useState(optional?.active);
    const childrenToArray = React.Children.toArray(children)
    const [params, setParams] = useSearchParams();

    useEffect(()=>{
        if(optional?.active){
            if (!formName) throw new Error("FormName is missing")
            const formData = JSON.parse(localStorage.getItem(formName) || "{}")

            children.forEach((child: any) => {
                if (!index) throw new Error("Index is missing!")
                createFieldsLocalStorage(index, child, formData, project)
            })

            localStorage.setItem(formName, JSON.stringify(formData))
        }
    }, [])

    const handleActiveCTA = (prop: any) => {
        if (!formName) throw new Error("FormName is missing")
        // busca o formulario no localStorage
        const formData = JSON.parse(localStorage.getItem(formName) || "{}")
        // busca a atual step do formulario
        const currentStep = params.get(STEP_NAME_URL);
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
                children.forEach((child: any) => {
                    if (!index) throw new Error("Index is missing!")
                    createFieldsLocalStorage(index, child, formData, project)
                })
                setDisplay(true)
            }

            localStorage.setItem(formName, JSON.stringify(formData))
            resolve(true)
        }) as Promise<boolean>
    }

    return (
        <div className="flex flex-col gap-4">

            <h2
                data-isoptional={optional?.optional}
                className="hidden data-[isoptional=true]:flex gap-4"
            >
                {optional?.text}
                <ToggleComponent
                    cb={handleActiveCTA}
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