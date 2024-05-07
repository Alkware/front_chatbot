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
    hiddenPreviewButton?: boolean;
    titleButtonSend?: string;
}

export function FormContainerForm({ children, onSubmit, form, activeSimulator = false, hiddenPreviewButton, titleButtonSend }: FormContainerForm) {
    const childrenToArray = React.Children.toArray(children);
    const numberChildren = childrenToArray.length
    const { setModalContent } = useContext(ModalContext)

    useEffect(() => {
        const { errors } = form.formState;

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

    }, [form.formState.errors]);

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
                className="w-full p-0 md:p-8 pt-0 flex flex-col gap-0 lg:gap-4 justify-start items-center relative"
            >

                <Steps
                    numberSteps={numberChildren}
                />

                <div className="w-full flex justify-center gap-4 mt-20 ">
                    <div
                        data-issimulator={activeSimulator}
                        className="w-full md:data-[issimulator=true]:w-3/5 flex flex-col max-w-[1200px]"
                    >

                        {children}

                    </div>

                    <div
                        data-issimulator={activeSimulator}
                        className="w-2/5 data-[issimulator=false]:hidden hidden md:block"
                    >
                        <SimulatorChat active={activeSimulator} />
                    </div>
                </div>

                <FormButtonStep
                    numberChildren={numberChildren}
                    findErrorMessage={findMessageError}
                    hiddenPreviewButton={hiddenPreviewButton}
                    titleButtonSend={titleButtonSend}
                />

                <div
                    data-issimulator={activeSimulator}
                    className="w-full data-[issimulator=false]:hidden md:hidden"
                >
                    <SimulatorChat active={activeSimulator} />
                </div>
            </form>
        </FormProvider>
    )
};