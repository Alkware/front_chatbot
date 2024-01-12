import React, { ReactElement, useState } from "react"
import { ToggleComponent } from "../../Toggle/Toggle"
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../../../variables/variables"
import { useSearchParams } from "react-router-dom"

interface FormMultipleInput {
    children: ReactElement[],
    optional?: {
        active: boolean,
        text: string
    },
    fieldName: string,
}

export function FormMultipleInput({ children, optional, fieldName }: FormMultipleInput) {
    const [display, setDisplay] = useState(false);
    const childrenToArray = React.Children.toArray(children)
    const [params, setParams] = useSearchParams();

    const handleActiveCTA = (prop: any) => {
        //aumenta uma ação no formulario, forçando a atualização do simulador do chat
        const actions = params.get("actions");
        const increaseActions = Number(actions) + 1;
        params.set("actions", increaseActions.toString());
        setParams(params)
        
        //retorna uma promisse se o toggle será off ou on
        return new Promise((resolve) => {
            if (prop === false) {
                children.forEach((child) => {
                    if (children.find(child => child.props.fieldName.includes("button_text"))) {
                        const chat = JSON.parse(localStorage.getItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
                        if(chat["project_name"]) {
                            chat["call_to_action"] = []
                            localStorage.setItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(chat))
                        }
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
                data-isoptional={optional?.active}
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
                {childrenToArray.map((child: any, index: number) => React.cloneElement(child, { key: index }))}
            </div>
        </div>
    )
};