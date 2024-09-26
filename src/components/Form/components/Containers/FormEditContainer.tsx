import React, { ReactElement, useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ListMenuModal } from "../../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyChats/components/EditProject/components/ListMenuModalChat/ListMenuModalChat";
import { ButtonsModal } from "../../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyChats/components/EditProject/components/ListMenuModalChat/components/ButtonModal/ButtonsModal";
import { SimulatorChat } from "../../../Simulators/SimulatorChat/SimulatorChat";
import { FormStep } from "./FormStep";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../modal/templates/PopOver";
import { object } from "zod";
import { MenuHambuguer } from "../../../MenuHambuguer/MenuHambuguer";
import { useSearchParams } from "react-router-dom";

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
    const { setModalContent } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const errors = form.formState.errors;
        const error: any = findMessageError(errors);
        console.log(error)
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
                            if (!step){
                                console.error("Failed the find the error step");
                                return;
                            };
                            params.set("form-step", step.toString());
                            setParams(params);
                        }}
                    />
            })
        }

    }, [form.formState.errors])

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
                className="w-screen h-screen flex flex-col md:flex-row gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="w-full h-[10%] min-h-[60px] md:w-auto md:min-h-full md:max-w-[220px] bg-primary-300 fixed md:static bottom-0 z-50 flex flex-row md:flex-col justify-between items-center border-r border-primary-100 md:bg-transparent">

                    <MenuHambuguer
                        urlParamName="menu_modal_edit_chat"
                        className="md:hidden"
                    />

                    <ListMenuModal
                        children={filterStepChildren}
                    />

                    <ButtonsModal
                        eventDelete={onDelete}
                    />

                </div>

                <div className="w-full h-full flex flex-col justify-start lg:flex-row gap-8 overflow-hidden overflow-y-auto pb-16 md:pb-0">
                    <div
                        className="w-full flex flex-col gap-12 p-4"
                    >
                        {childrenToArray.map((child: any, index: number) =>
                            React.cloneElement(child, { key: index, stepChildren: filterStepChildren })
                        )}
                    </div>

                    <div
                        data-activesimulator={!!activeSimulator}
                        className="w-auto h-full flex justify-center items-start py-4 px-2 data-[activesimulator=false]:hidden"
                    >
                        <SimulatorChat active={activeSimulator} />
                    </div>

                </div>
            </form>
        </FormProvider>
    )
};
