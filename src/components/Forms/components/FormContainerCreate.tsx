import React, { ReactElement } from "react";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";
import { FormStep } from "./FormStep";
import { ButtonSteps } from "./FormInputs/components/ButtonSteps/ButtonSteps";
import { useForm } from "react-hook-form";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>,
    plan_management_id: string
    activeSimulator?: boolean,
    isFormEdit?: boolean
    eventSubmit: (data: any)=> Promise<void>
}

export function FormContainerCreate({ children, activeSimulator, plan_management_id, isFormEdit, eventSubmit }: Container) {
    const childrenToArray = React.Children.toArray(children)
    const { handleSubmit, register, getValues, setValue } = useForm();


    return (
        <form
            className="w-full flex justify-evenly gap-8 p-4"
            onSubmit={handleSubmit(eventSubmit)}
        >
            <div
                className="flex flex-col gap-12 w-3/4 max-w-[700px]"
            >
                {
                    childrenToArray.map((child: any, index: number) =>
                        React.cloneElement(child, { key: index, register, getValues, setValue })
                    )
                }

                <ButtonSteps
                    stepSize={childrenToArray.length}
                    plan_management_id={plan_management_id}
                    isFormEdit={isFormEdit}
                />
            </div>

            <SimulatorChat active={activeSimulator} />
        </form>
    )
};