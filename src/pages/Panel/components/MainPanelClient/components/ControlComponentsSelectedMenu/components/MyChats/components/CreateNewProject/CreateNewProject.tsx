import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { Button } from "../../../../../../../../../../components/button/Button";
import { MdAdd } from "react-icons/md";

interface ButtonCreateChat {
    plan_management_id: string,
}

export function ButtonCreateChat({ plan_management_id }: ButtonCreateChat) {
    const { client } = useContext(ClientContext)
    const { setModalContent, clearModal } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleClickNewProject = () => {
        if (client?.plan_management) {
            if (!!client?.plan_management.prompt.length) {
                const maxPlans = Number(client.plan_management.plan.max_projects.default);
                const currentNumberOfProjects = client.plan_management.project.length
                if (client.plan_management.status !== "DISABLED") {
                    if (maxPlans > currentNumberOfProjects) {
                        navigate(`/create-chat/${plan_management_id}`)
                    } else {
                        setModalContent({
                            componentName: "modal_reached_max_plan",
                            components:
                                <PopOver
                                    message="Você atingiu o número maximo de chats por plano."
                                    componentName="modal_reached_max_plan"
                                />
                        })
                    }
                } else {
                    setModalContent({
                        componentName: "modal_plan_is_desabled",
                        components:
                            <PopOver
                                message="O plano da sua conta está desabilitado."
                                componentName="modal_plan_is_desabled"
                                functionAfterComplete={() => navigate("/panel?tab=4")}
                            />
                    })
                }
            } else {
                setModalContent({
                    componentName: "modal_create_database",
                    components:
                        <PopUp>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <h2 className="text-xl text-center">Para criar um novo chat, antes é necessário <br />  criar uma fonte de dados.</h2>
                                <h2 className="text-lg text-center opacity-80">Nossa inteligência artifical vai analisar seus dados e <br /> responder as dúvidas do usuário <br />conforme as informações passadas na fonte de dados.</h2>
                                <Button
                                    customClass="my-4"
                                    onClick={()=> { navigate("/panel?tab=2"); clearModal("modal_create_database")}}
                                >
                                    <MdAdd />
                                    Criar fonte de dados
                                </Button>
                            </div>
                        </PopUp>
                })
            }

        } else {
            setModalContent({
                componentName: "modal_without_plan",
                components:
                    <PopOver
                        message="Nenhum plano foi vinculado a sua conta"
                        componentName="modal_without_plan"
                        functionAfterComplete={() => navigate("/panel?tab=4")}
                    />
            })
        }
    }

    return (
        <TipContainer tip="Crie um novo chat">
            <div
                onClick={handleClickNewProject}
                className="border border-primary-100 rounded-full cursor-pointer"
            >
                <IoAddOutline className="text-4xl text-primary-100" />
            </div>
        </TipContainer>
    )

}


