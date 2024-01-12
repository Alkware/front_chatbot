import React, { ReactElement } from "react";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";
import { FormStep } from "./FormStep";
import { useForm } from "react-hook-form";
import { ListMenuModalChat } from "../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyProjects/components/EditProject/components/ListMenuModalChat/ListMenuModalChat";
import { Project } from "../../../@types/Project";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>,
    activeSimulator?: boolean,
    defaultValues: {},
    project: Project,
    eventSubmit: (data: any) => Promise<void>
    listName: Array<{
        text: string,
        icon: ReactElement,
        index: number
    }>
}

export function FormContainerEdit({ children, activeSimulator, defaultValues, project, eventSubmit, listName }: Container) {
    const childrenToArray = React.Children.toArray(children)
    const { handleSubmit, register, getValues, setValue } = useForm({ defaultValues });


    return (
        <form
            className="w-full flex justify-between gap-8 p-4"
            onSubmit={handleSubmit(eventSubmit)}
        >
            <ListMenuModalChat
                project={project}
                listName={listName}
            />

            <div
                className="flex flex-col gap-12 w-3/4 max-w-[700px]"
            >
                {
                    childrenToArray.map((child: any, index: number) =>
                        React.cloneElement(child, { key: index, register, getValues, setValue })
                    )
                }
            </div>

            <SimulatorChat active={activeSimulator} />
        </form>
    )
};