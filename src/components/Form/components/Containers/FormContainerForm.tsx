import React, { ReactElement, useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Steps } from "../Elements/Steps/Steps";
import { FormButtonStep } from "../Elements/ButtonSteps/ButtonSteps";
import { SimulatorChat } from "../../../Simulators/SimulatorChat/SimulatorChat";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { object } from "zod";

interface FormContainerForm {
    children: ReactElement | ReactElement[];
    onSubmit: SubmitHandler<any>;
    form: UseFormReturn<any>;
    activeSimulator?: boolean;
}

export function FormContainerForm({ children, onSubmit, form, activeSimulator = false }: FormContainerForm) {
    const childrenToArray = React.Children.toArray(children);
    const numberChildren = childrenToArray.length
    const { setModalContent } = useContext(ModalContext)

    useEffect(() => {
        const errors = form.formState.errors;
        const message = findMessageError(errors);
        if (!!message) {
            setModalContent({
                componentName: "modal_error_message",
                components:
                    <PopOver
                        message={message}
                        type="ERROR"
                        componentName="modal_error_message"
                    />
            })
        }

    }, [form.formState.errors])

    const findMessageError = (errors: any) => {
        if (typeof errors === 'object' && object !== null) {

            for (let key in errors) {

                if (key === "message") {
                    return errors[key]
                }
                else {
                    const errorMessage: any = findMessageError(errors[key]);
                    if (errorMessage !== undefined) return errorMessage;
                }

            }
        }
    }


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
                        findErrorMessage={findMessageError}
                    />
                </div>

            </form>
        </FormProvider>
    )
};