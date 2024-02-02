import React, { ReactElement } from "react";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { Steps } from "../Elements/Steps/Steps";
import { FormButtonStep } from "../Elements/ButtonSteps/ButtonSteps";
import { SimulatorChat } from "../../../SimulatorChat/SimulatorChat";

interface FormContainer {
    children: ReactElement | ReactElement[];
    onSubmit: SubmitHandler<any>;
    form: any
    activeSimulator?: boolean;
}

export function FormContainer({ children, onSubmit, form, activeSimulator = false }: FormContainer) {
    const childrenToArray = React.Children.toArray(children);
    const numberChildren = childrenToArray.length

    return (
        <FormProvider {...form}>
            <form
                className="w-3/4 flex flex-col gap-4 justify-center items-center"
                onSubmit={onSubmit}
            >

                <Steps
                    numberSteps={numberChildren}
                />

                <div className="w-full flex justify-evenly gap-8">
                    <div
                        className="w-full flex flex-col gap-12 max-w-[900px]"
                    >

                        {children}

                    </div>

                    <SimulatorChat active={activeSimulator} />
                </div>



                <div className="flex gap-4 justify-center items-center">
                    <FormButtonStep
                        numberChildren={numberChildren}
                    />
                </div>

            </form>
        </FormProvider>
    )
};