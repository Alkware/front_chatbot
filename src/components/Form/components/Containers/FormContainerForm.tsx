import React, { ReactElement, useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Steps } from "../Elements/Steps/Steps";
import { FormButtonStep } from "../Elements/ButtonSteps/ButtonSteps";
import { SimulatorChat } from "../../../Simulators/SimulatorChat/SimulatorChat";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { object } from "zod";
import { useSearchParams } from "react-router-dom";

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
    const numberChildren = childrenToArray.filter((child: any) => !child?.props?.hidden).length
    const { setModalContent } = useContext(ModalContext)
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const { errors } = form.formState;
        const error: any = findMessageError(errors);

        if (!!error) {
            setModalContent({
                componentName: "modal_error_message",
                components:
                    <PopOver
                        message={error.message}
                        type="ERROR"
                        componentName="modal_error_message"
                        functionAfterComplete={() => {
                            const { step } = error;
                            if (!step) {
                                console.error("Failed the find the error step");
                                return;
                            }
                            params.set("form-step", step.toString());
                            setParams(params);
                        }}
                    />
            })
        }

    }, [form.formState.errors]);

    const findMessageError = (errors: any) => {
        if (typeof errors === 'object' && object !== null) {
            for (let key in errors) {
                if (key === "message") {
                    return {
                        message: errors[key].split(":")[1],
                        step: errors[key].split(":")[0]
                    }
                } else {
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
                className="w-full p-0 md:p-4 pt-0 flex flex-col gap-0 lg:gap-4 justify-start items-center relative"
            >

                <Steps
                    numberSteps={numberChildren}
                />

                <div
                    data-hasstep={numberChildren > 0}
                    className="w-full flex justify-center mt-8 gap-4 data-[hasstep=true]:mt-20"
                >
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

                {/* Esse chat foi inserido aqui para o responsivo mobile (Remover futuramente) */}
                <div
                    data-issimulator={activeSimulator}
                    className="w-full data-[issimulator=false]:hidden md:hidden flex justify-center"
                >
                    <SimulatorChat active={activeSimulator} />
                </div>
            </form>
        </FormProvider>
    )
};