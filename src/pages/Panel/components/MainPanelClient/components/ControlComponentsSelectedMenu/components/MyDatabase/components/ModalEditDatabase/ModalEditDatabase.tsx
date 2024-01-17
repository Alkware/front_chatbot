import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { updateDatabase } from "../../../../../../../../../../api/Prompt";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { Form } from "../../../../../../../../../../components/Forms/Form";
import { FaWizardsOfTheCoast } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { Project } from "../../../../../../../../../../@types/Project";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../variables/variables";

const listName = [
    {
        text: "Prompt",
        icon: <FaWizardsOfTheCoast />,
        index: 0
    },
    {
        text: "Client",
        icon: <FaClipboardQuestion />,
        index: 1
    }
]

interface ModalEditDatabase {
    prompt: Prompt,
    project: Project
}


export function ModalEditDatabase({ prompt, project }: ModalEditDatabase) {
    const { setModalContent } = useContext(ModalContext);



    const handleUpdateDatabase = async () => {
        const data = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}")

        if (data) {
            const projectUpdate = await updateDatabase(data, prompt.id)
            if (projectUpdate && projectUpdate.status === 200) {
                setModalContent({
                    componentName: "modal_updated_database",
                    components:
                        <PopOver
                            message="Database atualizado com sucesso"
                            componentName="modal_updated_database"
                        />
                })
            }
        }
    }

    return (
        <div className="w-[70vw] h-[60vh] flex overflow-auto ">
            <Form.Container
                eventSubmit={handleUpdateDatabase}
                formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                listName={listName}
                project={project}
            >
                <Form.Step index={0}>
                    <Form.Input
                        fieldName="prompt_name"
                        title="Digite o nome dessa base de dados"
                    />


                    <Form.TextArea
                        fieldName="prompt"
                        height={300}
                        title="Escreva seu prompt aqui..."
                    />
                </Form.Step>

                <Form.Step index={1}>
                    <Form.TextArea
                        fieldName="describe_client"
                        height={150}
                        title="Escreva a persona do seu publico aqui..."
                    />
                </Form.Step>

            </Form.Container>
        </div>
    )
};