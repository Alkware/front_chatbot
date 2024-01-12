import React, { ReactElement, useEffect } from "react";
import { FormStep } from "./FormStep";
import { ButtonSteps } from "./FormInputs/components/ButtonSteps/ButtonSteps";
import { Steps } from "./FormInputs/components/Steps/Steps";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>,
    plan_management_id: string
    activeSimulator?: boolean,
    isFormEdit?: boolean
    eventSubmit: (data: any) => Promise<void>,
    formName: "chat" | "database"
}

export function FormContainerCreate({ children, activeSimulator, plan_management_id, formName }: Container) {
    const childrenToArray = React.Children.toArray(children)

    var chat: any = {};

    useEffect(() => {
        if (!formName) throw new Error("formName is missing!");

        chat = JSON.parse(localStorage.getItem(formName) || "{}")

        childrenToArray.forEach((child: any) => {
            if(!chat[child.props.index]) chat[child.props.index] = {};
            child.props.children.forEach((childStep: any) => {
                chat[child.props.index][childStep.props.fieldName] = ""
            });
        })

        localStorage.setItem(formName, JSON.stringify(chat))
    }, [])

    return (
        <div
            className="w-full flex flex-col items-center gap-8 p-4"
        >
            <Steps
                numberSteps={childrenToArray.length}
            />

            <div className="w-full flex justify-evenly gap-8">
                <div
                    className="flex flex-col gap-12 w-3/4 max-w-[700px]"
                >
                    {
                        childrenToArray.map((child: any, index: number) =>
                            React.cloneElement(child, { key: index, formName, chat })
                        )
                    }

                    <ButtonSteps
                        children={childrenToArray}
                        plan_management_id={plan_management_id}
                        formName={formName}
                    />
                </div>

                <SimulatorChat active={activeSimulator} />
            </div>
        </div>
    )
};