import { ReactElement } from "react";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";
import { FormStep } from "./FormStep";
import { ButtonSteps } from "./FormInputs/components/ButtonSteps/ButtonSteps";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>,
    plan_management_id: string
    activeSimulator?: boolean,
    isFormEdit?: boolean
}

export function FormContainer({ children, activeSimulator = false, plan_management_id, isFormEdit = false }: Container) {
    const childrenToArray: Array<any> = children as []


    return (
        <div className="w-full flex justify-evenly gap-8 p-4">

            <div
                className="flex flex-col gap-12 w-3/4 max-w-[700px]"
            >
                {children}

                <ButtonSteps
                    stepSize={childrenToArray.length}
                    plan_management_id={plan_management_id}
                    isFormEdit={isFormEdit}
                />
            </div>

            <SimulatorChat active={activeSimulator} />
        </div>
    )
};