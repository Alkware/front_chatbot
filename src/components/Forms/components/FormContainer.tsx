import React, { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { FormStep } from "./FormStep";
import { ButtonSteps } from "./FormInputs/components/ButtonSteps/ButtonSteps";
import { Steps } from "./FormInputs/components/Steps/Steps";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";
import { Project } from "../../../@types/Project";
import { ListMenuModalChat } from "../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyProjects/components/EditProject/components/ListMenuModalChat/ListMenuModalChat";
import { ButtonsModal } from "../../../pages/Panel/components/MainPanelClient/components/ControlComponentsSelectedMenu/components/MyProjects/components/EditProject/components/ListMenuModalChat/components/ButtonModal/ButtonsModal";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep>,
    project?: Project,
    plan_management_id?: string
    activeSimulator?: boolean,
    eventSubmit: () => Promise<void>,
    formName: "chat" | "database"
    listName?: Array<{
        text: string
        icon: ReactElement
        index: number,
    }>
    setData?: Dispatch<SetStateAction<[]>>
}



export function FormContainer({ children, activeSimulator, plan_management_id, project, formName, eventSubmit, listName, setData }: Container) {
    const childrenToArray = React.Children.toArray(children)

    var formData: any = {};

    useEffect(() => {
        if (!formName) throw new Error("formName is missing!");

        formData = JSON.parse(localStorage.getItem(formName) || "{}")

        childrenToArray.forEach((child: any) => {
            // Verifica se existe um index dentro do formData, caso não houver, será criado um array vazio.
            if (!formData[child.props.index]) formData[child.props.index] = {};

            // Looping que fará a criação dos campos no localStorage
            React.Children.toArray(child.props.children).forEach((stepChild: any) => {
                //
                // Condição que verifica se algum filho do container step é opcional,
                // caso seja opcional, ele não é criado na proxíma linha de código e 
                // sim posteriormente, caso o usuário decida preencher o campo.
                //
                if (!stepChild.props?.optional || stepChild.props.optional.active === false) {
                    createFieldsLocalStorage(child.props.index, stepChild, formData, project)
                }
            });
        })

        localStorage.setItem(formName, JSON.stringify(formData))
    }, [])

    return (
        <div
            data-is-modal-edit={!!listName?.length}
            className="w-full flex data-[is-modal-edit='true']:flex-row flex-col items-center gap-8 p-4"
        >
            {
                listName?.length ? (
                    <div className="w-auto h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center px-2 border-r border-primary-100">

                        <ListMenuModalChat
                            listName={listName}
                        />

                        <ButtonsModal
                            data={project}
                            eventSubmit={eventSubmit}
                            setData={setData}
                        />
                    </div>
                )
                    :
                    <Steps
                        numberSteps={childrenToArray.length}
                    />
            }

            <div className="w-full flex justify-evenly gap-8">
                <div
                    className="flex flex-col gap-12 w-3/4 max-w-[700px]"
                >
                    {
                        childrenToArray.map((child: any, index: number) =>
                            React.cloneElement(child, { key: index, formName, project })
                        )
                    }

                    {
                        !listName?.length &&
                        <ButtonSteps
                            children={childrenToArray}
                            plan_management_id={project?.plan_management_id || plan_management_id}
                            formName={formName}
                            eventSubmit={eventSubmit}
                        />
                    }
                </div>

                <SimulatorChat active={activeSimulator} />
            </div>
        </div>
    )
};


/**
 * Essa função cria de forma dinâmica todas as propriedades que serão salvas no localStorage
 * @param child - filhos do components
 * @param chat - chat que está armazenado no local storage
 * @returns 
 */
export function createFieldsLocalStorage(stepIndex: number, stepChild: any, formData: any, project: Project | undefined) {
    const fieldName = stepChild.props.fieldName
    // cria um array apartir dos pontos existentes no fieldname e desestrutura o array em 2 posições,
    // primeira posição é o nome da chave, a segunda posição define se é um objeto ou array, 
    // caso seja uma string, será objeto, caso seja um numero será array.
    const [firstKey, secondKey, thirdKey] = fieldName.split(".");

    // Essa expressão verifica se existe um project, caso existe, essa expressão vai buscar as chaves dentro de project
    // para preencher os dados do localStorage
    const fieldFoundedProject = project ? Object.entries(project).find(key => key[0] === firstKey) : null


    // Verifica se o nome do campo possui pontos, caso aja então a propriedade poderá ser um array ou objeto.
    if (fieldName.includes(".")) {

        // Tenta transormar o dado em um float
        const numTest = parseFloat(secondKey)

        // Verifica se o float é um número, caso seja, é criado um array.
        if ((!Number.isNaN(numTest) && Number.isFinite(numTest))) {
            if(!formData[stepIndex]) formData[stepIndex] = {}
            if (!formData[stepIndex][firstKey]) formData[stepIndex][firstKey] = fieldFoundedProject?.length ? fieldFoundedProject[1] : []
            if (thirdKey) {
                if (!formData[stepIndex][firstKey][secondKey]) formData[stepIndex][firstKey][secondKey] = {}
                formData[stepIndex][firstKey][secondKey][thirdKey] = null
            }
        }
        // caso não seja, será criado um objeto.
        else {
            if (!formData[stepIndex][firstKey]) formData[stepIndex][firstKey] = {}
            formData[stepIndex][firstKey][secondKey] = fieldFoundedProject?.length ? fieldFoundedProject[1] : null
        }

        // Return para não executar o proximo comando.
        return
    }

    // Cria propriedades com valor nulo baseado nos campos filhos do container step
    formData[stepIndex][fieldName] = fieldFoundedProject?.length ? fieldFoundedProject[1] : null

}