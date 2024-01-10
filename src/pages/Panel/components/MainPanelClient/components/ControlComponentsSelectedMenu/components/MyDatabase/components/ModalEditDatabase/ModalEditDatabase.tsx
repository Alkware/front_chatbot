import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { updateDatabase } from "../../../../../../../../../../api/Prompt";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { Form } from "../../../../../../../../../../components/Forms/Form";
import { FaWizardsOfTheCoast } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { Project } from "../../../../../../../../../../@types/Project";

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

export function ModalEditDatabase({ prompt, project }: { prompt: Prompt, project: Project }) {
    const [defaultValues, setDefaultValues] = useState<{}>();
    const { setModalContent } = useContext(ModalContext);


    useEffect(() => {
        setDefaultValues({
            prompt_name: prompt.prompt_name,
            prompt: prompt.prompt,
            describe_client: prompt.describe_client
        })
    }, [])


    const handleUpdateDatabase = async (data: any) => {
        if (data) {
            const projectUpdate = await updateDatabase(data, prompt.id)
            if (projectUpdate && projectUpdate.status === 200) {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Database atualizado com sucesso" />
                })
            }
        }
    }

    return (
        defaultValues &&
        <div className="w-[70vw] h-[60vh] flex overflow-auto ">
            <Form.ContainerEdit
                eventSubmit={handleUpdateDatabase}
                listName={listName}
                project={project}
                defaultValues={defaultValues}
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

            </Form.ContainerEdit>
        </div>
    )
};