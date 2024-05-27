import { useContext, useState } from "react"
import { ButtonCreateNewDatabase } from "./components/CreateNewDatabase/ButtonCreateNewDatabase"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { ModalContext } from "../../../../../../../../context/ModalContext"
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp"
import { ModalEditDatabase } from "./components/ModalEditDatabase/ModalEditDatabase"
import { Container } from "../../../../../../../../components/Container/Container"
import { FaDatabase, FaLock } from "react-icons/fa"
import { MAX_CONTAINER_TO_CREATE_DATABASE } from "../../../../../../../../variables/variables"
import { Prompt } from "../../../../../../../../@types/prompt.types"
import { MdEdit } from "react-icons/md"
import { Button } from "../../../../../../../../components/button/Button"
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver"
import { updateDatabaseName } from "../../../../../../../../api/Prompt"
import { TutoralContainer } from "../../../../../../../../components/TutoralContainer/TutoralContainer"

export function MyDatabases() {
    const { client } = useContext(ClientContext)
    const { setModalContent, clearModal } = useContext(ModalContext)
    const limitPromps = Array(MAX_CONTAINER_TO_CREATE_DATABASE).fill(0)
    const [prompts, setPrompts] = useState<Prompt[]>(client?.plan_management?.prompt || [])


    const handleEditDatabase = (index: number) => {
        if (!!prompts?.length) {
            setModalContent({
                componentName: "modal_create_database",
                components:
                    <PopUp>
                        <ModalEditDatabase
                            prompt={prompts[index]}
                            setPrompts={setPrompts}
                        />
                    </PopUp>
            })

        }
    }

    const handleEditNameDatabase = (index: number) => {

        async function saveNewNameDatabase(e: any) {
            e.preventDefault();
            const name = e.target.querySelector("input").value;
            const prompt_id = prompts[index].id
            if (name) {
                const updated = await updateDatabaseName(name, prompt_id);
                if (updated?.status === 200) {
                    setPrompts([...prompts, prompts[index].prompt_name = name])
                    setModalContent({
                        componentName: "modal_saved",
                        components:
                            <PopOver
                                message="Nome da sua base de dados foi atualizado com sucesso!"
                                componentName="modal_saved"
                                functionAfterComplete={() => clearModal(null, { clearAll: true })}
                            />
                    })
                }
            }
        }


        setModalContent({
            componentName: "modal_edit_name",
            components:
                <PopUp>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h2>Digite o novo nome da sua fonte de dados:</h2>
                        <form
                            onSubmit={saveNewNameDatabase}
                            className="flex flex-col justify-center items-center gap-4"
                        >
                            <input
                                placeholder="Ex: Minha nova base de dados"
                                name="database_name"
                                defaultValue={prompts[index].prompt_name}
                            />
                            <Button>Salvar</Button>
                        </form>
                    </div>
                </PopUp>
        })
    }

    return (
        (client) &&
        <Container title="Fonte de dados">
            <div className="w-full flex-wrap flex justify-center p-4 my-12 gap-8">
                {
                    limitPromps.map((_, index) =>
                        //Verifica quantos slots o usuário tem disponivel e o resto que não está disponivel ficará com um cadeado.
                        (client.plan_management?.plan && index < Number(client.plan_management.plan.max_databases.default)) ?
                            (
                                <div
                                    key={index}
                                    data-prompt={!!prompts[index]?.prompt_name}
                                    className="w-full max-w-[300px] flex justify-center items-center rounded-xl cursor-pointer border border-primary-100 bg-primary-100 dark:bg-primary-300 hover:bg-primary-200 text-light dark:text-primary-100 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                                >
                                    {
                                        prompts[index]?.prompt_name ?
                                            <div className=" flex gap-2 items-center justify-center">
                                                <h2
                                                    className="w-[200px] text-center py-4 flex justify-center items-center gap-2"
                                                    onClick={() => handleEditDatabase(index)}
                                                >
                                                    <FaDatabase />
                                                    <span className="w-full whitespace-nowrap text-ellipsis overflow-x-hidden">
                                                        {prompts[index]?.prompt_name}
                                                    </span>
                                                </h2>

                                                <MdEdit
                                                    className="cursor-text "
                                                    onClick={() => handleEditNameDatabase(index)}
                                                />
                                            </div>
                                            :
                                            <TutoralContainer
                                                title="Vamos criar sua primeira fonte de dados"
                                                text="Clique em <span class='font-medium text-2xl mx-1'>+</span> para criar sua primeira fonte de dados."
                                                position="BOTTOM"
                                                hidden={index !== 0}
                                            >
                                                <ButtonCreateNewDatabase plan_management_id={client.plan_management.id} />
                                            </TutoralContainer>
                                    }
                                </div>
                            )
                            :
                            (
                                <div
                                    key={index}
                                    data-prompt={!!prompts[index]?.prompt_name}
                                    className="w-full max-w-[300px] flex opacity-30 cursor-not-allowed justify-center items-center rounded-xl border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                                >
                                    <FaLock className="py-3 text-5xl" />
                                </div>
                            )
                    )
                }
            </div >
        </Container>
    )
};