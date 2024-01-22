import { useContext, useState } from "react"
import CreateNewDatabases from "./components/CreateNewDatabase/CreateNewDatabase"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { ModalContext } from "../../../../../../../../context/ModalContext"
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp"
import { ModalEditDatabase } from "./components/ModalEditDatabase/ModalEditDatabase"
import { Container } from "../../../../../../../../components/Container/Container"
import { FaDatabase, FaLock } from "react-icons/fa"
import { MAX_CONTAINER_TO_CREATE_DATABASE } from "../../../../../../../../variables/variables"
import { Prompt } from "../../../../../../../../@types/prompt.types"

export function MyDatabases() {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
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

    return (
        (client) &&
        <Container title="Fonte de dados">
            <div className="w-full flex-wrap flex justify-center p-4 my-12 gap-8">
                {
                    limitPromps.map((_, index) =>
                        //Verifica quantos slots o usuário tem disponivel e o resto que não está disponivel ficará com um cadeado.
                        (client.plan_management?.plan && index < client.plan_management.plan.max_databases) ?
                            (
                                <div
                                    key={index}
                                    data-prompt={!!prompts[index]?.prompt_name}
                                    className="flex justify-center items-center rounded-xl cursor-pointer border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                                >
                                    {
                                        prompts[index]?.prompt_name ?
                                            <h2
                                                className="w-[300px] py-4 flex justify-center items-center gap-2"
                                                onClick={() => handleEditDatabase(index)}
                                            ><FaDatabase />  {prompts[index]?.prompt_name}</h2>
                                            :
                                            <CreateNewDatabases plan_management_id={client.plan_management.id} />
                                    }
                                </div>
                            )
                            :
                            (
                                <div
                                    key={index}
                                    data-prompt={!!prompts[index]?.prompt_name}
                                    className="flex opacity-30 cursor-not-allowed justify-center items-center rounded-xl border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                                >
                                    <FaLock className="w-[300px] py-3 text-5xl" />
                                </div>
                            )
                    )
                }
            </div >
        </Container>
    )
};