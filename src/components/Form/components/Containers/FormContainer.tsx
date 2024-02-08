import React, { ReactElement } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Steps } from "../Elements/Steps/Steps";
import { FormButtonStep } from "../Elements/ButtonSteps/ButtonSteps";
import { SimulatorChat } from "../../../Simulators/SimulatorChat/SimulatorChat";
import { CreateChatSchema } from "../../../../schema/zod/chatSchema";

interface FormContainer {
    children: ReactElement | ReactElement[];
    onSubmit: SubmitHandler<any>;
    form: UseFormReturn<CreateChatSchema>;
    activeSimulator?: boolean;
}

export function FormContainer({ children, onSubmit, form, activeSimulator = false }: FormContainer) {
    const childrenToArray = React.Children.toArray(children);
    const numberChildren = childrenToArray.length

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-8 flex flex-col gap-4 justify-center items-center"
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