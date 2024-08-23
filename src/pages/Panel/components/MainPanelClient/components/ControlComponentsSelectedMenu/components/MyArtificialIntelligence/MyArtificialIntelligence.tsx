import { useContext, useState } from "react"
import { ButtonCreateNewAI } from "./components/CreateNewDatabase/ButtonCreateNewDatabase"
import { ClientContext } from "../../../../../../../../context/ClientContext"
import { ModalContext } from "../../../../../../../../context/ModalContext"
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp"
import { Container } from "../../../../../../../../components/Container/Container"
import { FaDatabase, FaLock } from "react-icons/fa"
import { MAX_CONTAINER_TO_CREATE_DATABASE } from "../../../../../../../../variables/variables"
import { MdEdit } from "react-icons/md"
import { Button } from "../../../../../../../../components/button/Button"
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver"
import { updateDatabaseName } from "../../../../../../../../api/artificialIntelligence.api"
import { Artificial_Intelligence } from "../../../../../../../../@types/artificialInteligence.types"
import { ModalEditArtificialIntelligence } from "./components/ModalEditArtificialIntelligence/ModalEditArtificialIntelligence"

export function MyArtificialIntelligence() {
    const { client } = useContext(ClientContext)
    const { setModalContent, clearModal } = useContext(ModalContext)
    const limitPromps = Array(MAX_CONTAINER_TO_CREATE_DATABASE).fill(0)
    const [intelligence, setIntelligence] = useState<Artificial_Intelligence[]>(client?.plan_management?.artificial_intelligence || [])

    /**
     * Função responsável por editar uma inteligencia artificial...
     * @param {number} index Index da inteligencia a ser editada...
     */
    const handleEditArtificialIntelligence = (index: number) => {
        if (!!intelligence?.length && client?.plan_management) {
            setModalContent({
                componentName: "modal_create_database",
                components:
                    <PopUp>
                        <ModalEditArtificialIntelligence
                            plan_management_id={client?.plan_management.id}
                            intelligence={intelligence[index]}
                            setIntelligence={setIntelligence}
                        />
                    </PopUp>
            })

        }
    }

    /**
     * Função responsável por alterar o nome da inteligência artificial...
     * @param {string} index Index da inteligencia artificial que vai mudar o nome.
     */
    const handleEditIdentificationArtificialName = (index: number) => {

        async function saveNewNameDatabase(e: any) {
            e.preventDefault();
            const name = e.target.querySelector("input").value;
            const prompt_id = intelligence[index].id
            if (name) {
                const updated = await updateDatabaseName(name, prompt_id);
                if (updated?.status === 200) {
                    setIntelligence([...intelligence, intelligence[index].artificial_name = name])
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
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                        <h2>Digite o novo nome da sua fonte de dados:</h2>
                        <form
                            onSubmit={saveNewNameDatabase}
                            className="flex flex-col justify-center items-center gap-4"
                        >
                            <input
                                placeholder="Ex: Minha nova base de dados"
                                name="database_name"
                                defaultValue={intelligence[index].artificial_name}
                            />
                            <Button>Salvar</Button>
                        </form>
                    </div>
                </PopUp>
        })
    }

    return (
        (client) &&
        <Container title="Inteligência artificial">
            <div className="w-full flex-wrap flex justify-center p-4 my-12 gap-8">
                {
                    limitPromps.map((_, index) =>
                        //Verifica quantos slots o usuário tem disponivel e o resto que não está disponivel ficará com um cadeado.
                        (client.plan_management?.plan && index < Number(client.plan_management.plan.max_databases.default)) ?
                            (
                                <div
                                    key={index}
                                    className="w-full max-w-[300px] flex justify-center items-center cursor-pointer"
                                >
                                    {
                                        intelligence[index]?.identification ?
                                            <div className="w-full flex gap-2 items-center justify-center rounded-xl border border-primary-100 bg-primary-100 dark:bg-primary-300 hover:bg-primary-200 text-white dark:text-primary-100 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20">
                                                <h2
                                                    className="w-[200px] text-center py-4 flex justify-center items-center gap-2"
                                                    onClick={() => handleEditArtificialIntelligence(index)}
                                                >
                                                    <FaDatabase />
                                                    <span className="w-full whitespace-nowrap text-ellipsis overflow-x-hidden">
                                                        {intelligence[index]?.identification}
                                                    </span>
                                                </h2>

                                                <MdEdit
                                                    className="cursor-text "
                                                    onClick={() => handleEditIdentificationArtificialName(index)}
                                                />
                                            </div>
                                            :
                                            <ButtonCreateNewAI
                                                plan_management_id={client.plan_management.id}
                                                index={index}
                                            />
                                    }
                                </div>
                            )
                            :
                            (
                                <div
                                    key={index}
                                    data-prompt={!!intelligence[index]?.artificial_name}
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