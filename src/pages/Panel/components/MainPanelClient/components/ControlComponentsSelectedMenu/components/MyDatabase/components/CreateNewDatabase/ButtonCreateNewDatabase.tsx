import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { TutoralContainer } from "../../../../../../../../../../components/TutoralContainer/TutoralContainer";

export function ButtonCreateNewDatabase({ plan_management_id, index }: { plan_management_id: string, index: number }) {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleClickNewDatabases = () => {
        if (client?.plan_management) {

            const maxPlans = Number(client.plan_management.plan.max_databases.default);
            const currentNumberOfProjects = client.plan_management.prompt.length

            if (client.plan_management.status !== "DISABLED") {
                if (maxPlans > currentNumberOfProjects) {
                    navigate(`/create-database/${plan_management_id}`)
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
            className="w-full rounded-xl border border-primary-100 bg-primary-100 dark:bg-primary-300 hover:bg-primary-200 text-light dark:text-primary-100 text-xl data-[prompt=false]:text-2xl data-[prompt=false]:bg-primary-200/20 flex justify-center"
            onClick={handleClickNewDatabases}
        >
            <TutoralContainer
                title="Vamos criar sua primeira fonte de dados"
                text="Clique em <span class='font-medium text-2xl mx-1'>+</span> para criar sua primeira fonte de dados."
                position="BOTTOM"
                hidden={index !== 0}
            >
                <TipContainer
                    tip="Criar fonte de dados"
                >
                    <FaPlus className="text-5xl py-3 fill-primary-100" />
                </TipContainer>
            </TutoralContainer>
        </div>
    )

}

export default ButtonCreateNewDatabase;

