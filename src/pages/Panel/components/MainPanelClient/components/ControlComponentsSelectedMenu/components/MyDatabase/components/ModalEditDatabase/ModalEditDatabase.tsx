import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { updateDatabase } from "../../../../../../../../../../api/Prompt";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { Form } from "../../../../../../../../../../components/Forms/Form";
import { FaWizardsOfTheCoast } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../variables/variables";
import { ListMenuModalChat } from "../../../MyProjects/components/EditProject/components/ListMenuModalChat/ListMenuModalChat";
import { ButtonsModal } from "../../../MyProjects/components/EditProject/components/ListMenuModalChat/components/ButtonModal/ButtonsModal";
import { daleteDatabase } from "../../../../../../../../../../api/Prompt";

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
    setPrompts: Dispatch<SetStateAction<Prompt[]>>,
}


export function ModalEditDatabase({ prompt, setPrompts }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);


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
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            }
        }
    }

    async function handleDeleteDatabase() {
        if (prompt.id) {
            // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
            const deleted = await daleteDatabase(prompt.id);

            if (deleted?.status === 200) {
                localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
                setPrompts((data: any) => data.filter((d: any) => d.id !== deleted.data.id))

                setModalContent({
                    componentName: "modal_delete_success",
                    components:
                        <PopOver
                            message="Fonte de dados excluido com sucesso!"
                            componentName="modal_delete_success"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            } else if(deleted?.status === 500){
                setModalContent({
                    componentName: "modal_failed_delete_database",
                    components:
                        <PopOver
                            message="Você não pode excluir uma fonte de dados que possui um chat vinculado a ela, tente excluir todos os chats primeiro, antes de excluir essa fonte de dados."
                            type="ERROR"
                            componentName="modal_failed_delete_database"
                        />
                })
            }
        }
    }


    return (
        <div className="w-[70vw] h-[60vh] flex overflow-auto ">

            <div className="w-auto h-full max-w-[300px] min-w-[250px] flex flex-col justify-between items-center px-2 border-r border-primary-100">

                <ListMenuModalChat
                    listName={listName}
                />

                <ButtonsModal
                    eventSubmit={handleUpdateDatabase}
                    eventDelete={handleDeleteDatabase}
                    formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                />
            </div>

            <Form.Container
                formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                data={prompt}
            >
                <Form.Step index={0}>
                    <Form.Input
                        fieldName="prompt_name"
                        title="Digite o nome dessa base de dados"
                        defaultValue={prompt.prompt_name}
                    />


                    <Form.TextArea
                        fieldName="prompt"
                        height={300}
                        title="Escreva seu prompt aqui..."
                        defaultValue={prompt.prompt}
                    />
                </Form.Step>

                <Form.Step index={1}>
                    <Form.TextArea
                        fieldName="describe_client"
                        height={150}
                        title="Escreva a persona do seu publico aqui..."
                        defaultValue={prompt.describe_client}
                    />
                </Form.Step>

            </Form.Container>
        </div>
    )
};