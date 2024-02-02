import React, { ReactElement, useEffect, useState } from "react";
import { FormStep } from "./FormStep";
import { Steps } from "./FormInputs/components/Steps/Steps";
import { SimulatorChat } from "../../SimulatorChat/SimulatorChat";
import { FormControllerButton } from "./FormControllerButton";

interface Container {
    children: ReactElement<typeof FormStep>[] | ReactElement<typeof FormStep> | ReactElement<typeof FormControllerButton>,
    data?: {},
    activeSimulator?: boolean,
    formName: "chat" | "database"
}

export function FormContainer({ children, activeSimulator, data, formName }: Container) {
    // Transform os children em array e filtra apenas os children que contém index, ou seja, esse child é um container step.
    const childrenToArray = React.Children.toArray(children)
    const filterStepChildren  = childrenToArray.filter((child: any) => child.props.index >= 0)
    const [access, setAccess] =  useState<boolean>()

    var formData: any = {};

    useEffect(() => {
        if (!formName) throw new Error("formName is missing!");

        formData = JSON.parse(localStorage.getItem(formName) || "{}")

        filterStepChildren.forEach((child: any) => {
            // Verifica se existe um index dentro do formData, caso não houver, será criado um array vazio.
            if (!formData[child.props.index]){
                formData[child.props.index] = {};

                // Looping que fará a criação dos campos no localStorage
                React.Children.toArray(child.props.children).forEach((stepChild: any) => {
                    if(stepChild.props.fieldName){
                        //
                        // Condição que verifica se algum filho do container step é opcional,
                        // caso seja opcional, ele não é criado na proxíma linha de código e 
                        // sim posteriormente, caso o usuário decida preencher o campo.
                        //
                        if (!stepChild.props?.optional || stepChild.props.optional.active === false) {
                            createFieldsLocalStorage(child.props.index, stepChild, formData, data)
                        }
                    }
                });
            }
        })
        
        localStorage.setItem(formName, JSON.stringify(formData))
        // libera o acesso para exibir os inputs
        setAccess(true)
    }, []);


    return (
        access &&
        <div
            data-is-modal-edit={!!data}
            className="w-full flex data-[is-modal-edit='true']:flex-row flex-col items-center gap-4 p-4"
        >
            {
                !data &&
                <Steps
                    numberSteps={filterStepChildren.length}
                />
            }

            <div className="w-full flex justify-evenly gap-8">
                <div
                    className="w-full flex flex-col gap-12 max-w-[900px]"
                >
                    {
                        childrenToArray.map((child: any, index: number) =>
                            React.cloneElement(child, { key: index, formName, data, stepChildren: filterStepChildren })
                        )
                    }
                </div>

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
export function createFieldsLocalStorage(stepIndex: number, stepChild: any, formData: any, data: {} | undefined) {
    const fieldName = stepChild.props.fieldName
    // cria um array apartir dos pontos existentes no fieldname e desestrutura o array em 2 posições,
    // primeira posição é o nome da chave, a segunda posição define se é um objeto ou array, 
    // caso seja uma string, será objeto, caso seja um numero será array.
    const [firstKey, secondKey, thirdKey] = fieldName.split(".");

    // Essa expressão verifica se existe um Data, caso existe, essa expressão vai buscar as chaves dentro de Data
    // para preencher os dados do localStorage
    const fieldFoundedData = data ? Object.entries(data).find(key => key[0] === firstKey) : null


    // Verifica se o nome do campo possui pontos, caso aja então a propriedade poderá ser um array ou objeto.
    if (fieldName.includes(".")) {

        // Tenta transormar o dado em um float
        const numTest = parseFloat(secondKey)

        // Verifica se o float é um número, caso seja, é criado um array.
        if ((!Number.isNaN(numTest) && Number.isFinite(numTest))) {
            if (!formData[stepIndex]) formData[stepIndex] = {}
            if (!formData[stepIndex][firstKey]) formData[stepIndex][firstKey] = fieldFoundedData?.length ? fieldFoundedData[1] : []
            if (thirdKey) {
                if (!formData[stepIndex][firstKey][secondKey]) formData[stepIndex][firstKey][secondKey] = {}
                formData[stepIndex][firstKey][secondKey][thirdKey] = null
            }
        }
        // caso não seja, será criado um objeto.
        else {
            if (!formData[stepIndex][firstKey]) formData[stepIndex][firstKey] = {}
            formData[stepIndex][firstKey][secondKey] = fieldFoundedData?.length ? fieldFoundedData[1] : null
        }

        // Return para não executar o proximo comando.
        return
    }

    try {
        // Cria propriedades com valor nulo baseado nos campos filhos do container step
        formData[stepIndex][fieldName] = fieldFoundedData?.length ? fieldFoundedData[1] : null
    } catch (error) {
        console.error("This error may have occurred if the input has a parent element with an existing fieldName. solution: 'parent_field_name.input_fieldname' or", error)
    }

}