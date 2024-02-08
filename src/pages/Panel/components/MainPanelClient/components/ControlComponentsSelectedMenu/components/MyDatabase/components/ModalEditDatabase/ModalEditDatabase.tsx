import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { updateDatabase } from "../../../../../../../../../../api/Prompt";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../variables/variables";
import { daleteDatabase } from "../../../../../../../../../../api/Prompt";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { databaseSchema } from "../../../../../../../../../../schema/zod/databaseSchema";

interface ModalEditDatabase {
    prompt: Prompt,
    setPrompts: Dispatch<SetStateAction<Prompt[]>>,
}

export function ModalEditDatabase({ prompt, setPrompts }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const updateDatabaseForm = useForm({ resolver: zodResolver(databaseSchema) });


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
            } else if (deleted?.status === 500) {
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
            <Root.EditForm
                form={updateDatabaseForm}
                onDelete={handleDeleteDatabase}
                onSubmit={handleUpdateDatabase}
            >

                <Root.EditStep
                    index={0}
                    titleStep="Informações básicas"
                >
                    <Root.Input 
                        name="a"
                        title="as"
                    />

                </Root.EditStep>

            </Root.EditForm>

        </div>
    )
};