import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";

export function ButtonCreateNewDatabase({ plan_management_id }: { plan_management_id: string }) {
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

    return <FaPlus className="w-[300px] text-5xl py-3 " onClick={handleClickNewDatabases} />

}

export default ButtonCreateNewDatabase;

