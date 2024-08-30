import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { TutoralContainer } from "../../../../../../../../../../components/TutoralContainer/TutoralContainer";

export function ButtonCreateNewAI({ plan_management_id, index }: { plan_management_id: string, index: number }) {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleClickNewDatabases = () => {
        if (client?.plan_management) {

            const maxPlans = Number(client.plan_management.plan.max_databases.default);
            const currentNumberOfProjects = client.plan_management.artificial_intelligence.length

            if (client.plan_management.status !== "DISABLED") {
                if (maxPlans > currentNumberOfProjects) {
                    navigate(`/create-ai/${plan_management_id}`)
                } else {
                    setModalContent({
                        componentName: "modal_max_database",
                        components:
                            <PopOver
                                message="Você atingiu o número maximo de base de dados no seu plano."
                                componentName="modal_max_database"
                            />
                    })
                }
            } else {
                setModalContent({
                    componentName: "modal_desactive_account",
                    components:
                        <PopOver
                            message="O plano da sua conta está desabilitado."
                            componentName="modal_desactive_account"
                        />
                })
            }

        } else {
            setModalContent({
                componentName: "modal_without_plan",
                components:
                    <PopOver
                        message="Nenhum plano foi vinculado a sua conta"
                        componentName="modal_without_plan"
                    />
            })
        }
    }

    return (
        <div
            className="w-full rounded-md border border-primary-100 bg-primary-100 dark:bg-primary-300 hover:bg-primary-200 text-white dark:text-primary-100 data-[prompt=false]:bg-primary-200/20 flex justify-center"
            onClick={handleClickNewDatabases}
        >
            <TutoralContainer
                title="Vamos criar sua primeira fonte de dados"
                text="Clique em <span class='font-medium text-2xl mx-1'>+</span> para criar sua primeira fonte de dados."
                positionX={window.innerWidth > 680 ? "RIGHT" : "CENTER" }
                hidden={index !== 0}
            >
                <TipContainer
                    tip="Criar fonte de dados"
                >
                    <FaPlus className="size-10 py-2 fill-light dark:fill-primary-100" />
                </TipContainer>
            </TutoralContainer>
        </div>
    )

}

export default ButtonCreateNewAI;
