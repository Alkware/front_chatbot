import React, { ReactElement, useEffect } from "react"
import { createFieldsLocalStorage } from "./FormContainer"
import { Project } from "../../../@types/Project"

interface FormMultipleInput {
    children: ReactElement[] | ReactElement,
    fieldName: string
    formName?: string
    index?: number,
    project?: Project
}

export function FormMultipleInput({ children, formName, index, project }: FormMultipleInput) {
    const childrenToArray = React.Children.toArray(children)

    useEffect(() => {

        if (!formName) throw new Error("FormName is missing")
        const formData = JSON.parse(localStorage.getItem(formName) || "{}")

        childrenToArray.forEach((child: any) => {
            if (index === null || index === undefined) throw new Error("Index is missing!");
            if(child.props.field_name){
                createFieldsLocalStorage(index, child, formData, project)
            }
            
        })

        localStorage.setItem(formName, JSON.stringify(formData))

    }, [])


    return (
        <div
            className="flex justify-between items-end gap-8"
        >
            {childrenToArray.map((child: any, i: number) => React.cloneElement(child, { key: i, formName, index }))}
        </div>
    )
};