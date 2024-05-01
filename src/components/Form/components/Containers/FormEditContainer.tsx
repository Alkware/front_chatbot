import React, { ReactElement, useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ListMenuModal } from "../../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyChats/components/EditProject/components/ListMenuModalChat/ListMenuModalChat";
import { ButtonsModal } from "../../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyChats/components/EditProject/components/ListMenuModalChat/components/ButtonModal/ButtonsModal";
import { SimulatorChat } from "../../../Simulators/SimulatorChat/SimulatorChat";
import { FormStep } from "./FormStep";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { object } from "zod";

interface EditContainer {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>;
    onSubmit: SubmitHandler<any>;
    onDelete: () => Promise<void>;
    form: UseFormReturn<any>;
    activeSimulator?: boolean;
}

export function FormEditContainer({ children, form, activeSimulator, onDelete, onSubmit }: EditContainer) {
    // Transform os children em array e filtra apenas os children que contém index, ou seja, esse child é um container step.
    const childrenToArray = React.Children.toArray(children)
    const filterStepChildren = childrenToArray.filter((child: any) => child.props.index >= 0);
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
                className="w-full flex flex-row items-center gap-4 p-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="w-auto min-h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center border-r border-primary-100 relative">

                    <ListMenuModal
                        children={filterStepChildren}
                    />

                    <ButtonsModal
                        eventDelete={onDelete}
                    />

                </div>

                <div className="w-full h-full overflow-auto hidden-scrollbar flex justify-evenly gap-8">
                    <div
                        className="w-full flex flex-col gap-12 max-w-[900px]"
                    >
                        {
                            childrenToArray.map((child: any, index: number) =>
                                React.cloneElement(child, { key: index, stepChildren: filterStepChildren })
                            )
                        }
                    </div>

                    <div className="h-full flex items-center">
                        <SimulatorChat active={activeSimulator} />
                    </div>

                </div>
            </form>
        </FormProvider>
    )
};
