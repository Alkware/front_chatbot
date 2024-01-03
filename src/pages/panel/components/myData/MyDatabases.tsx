import { useContext } from "react"
import { ClientContext } from "../../../../context/ClientContext"
import CreateNewDatabases from "./components/createNewDatabases"
import { Prompt } from "../../../../@types/prompt.types";
import { ModalContext } from "../../../../context/ModalContext";
import { ModalEditDatabase } from "./components/modal/ModalEditDatabase";
import { Container } from "../../../../components/Container/Container";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { FaDatabase, FaLock } from "react-icons/fa6";

export function MyDatabases() {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const limitPromps = Array(9).fill(0)


    const handleEditDatabase = (prompt: Prompt) => {
        setModalContent({
            isOpenModal: true,
            components: <PopUp><ModalEditDatabase prompt={prompt} /></PopUp>
        })
    }

    return (
        client &&
        <Container title="Fonte de dados">
            <div className="w-full flex-wrap flex justify-center p-4 my-12 gap-8">
                {
                    limitPromps.map((zero, index) =>
                        index < client.plan_management.plan.max_databases ?
                            <div
                                key={index}
                                data-prompt={!!client.plan_management.prompt[index]?.prompt_name}
                                className="flex justify-center items-center rounded-xl cursor-pointer border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                            >
                                {
                                    client.plan_management.prompt[index]?.prompt_name ?
                                        <h2
                                            className="w-[300px] py-4 flex justify-center items-center gap-2"
                                            onClick={() => handleEditDatabase(client.plan_management.prompt[index])}
                                        ><FaDatabase />  {client.plan_management.prompt[index]?.prompt_name}</h2>
                                        :
                                        <CreateNewDatabases plan_management_id={client.plan_management.id} />
                                }
                            </div>
                            :
                            <div
                                key={index}
                                data-prompt={!!client.plan_management.prompt[index]?.prompt_name}
                                className="flex opacity-30 cursor-not-allowed justify-center items-center rounded-xl border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20"
                            >
                                <FaLock className="w-[300px] py-3 text-5xl" />
                            </div>
                    )
                }
            </div >
        </Container>
    )
};