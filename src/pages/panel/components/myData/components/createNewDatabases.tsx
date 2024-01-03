import { useContext } from "react";
import { ClientContext } from "../../../../../context/ClientContext";
import { ModalContext } from "../../../../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { PopOver } from "../../../../../components/modal/templates/PopOver";
import { FaPlus } from "react-icons/fa";

export function CreateNewDatabases({ plan_management_id }: { plan_management_id: string }) {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleClickNewDatabases = () => {
        if (client?.plan_management) {

            const maxPlans = client.plan_management.plan.max_databases;
            const currentNumberOfProjects = client.plan_management.prompt.length

            if (client.plan_management.status !== "DISABLED") {
                if (maxPlans > currentNumberOfProjects) {
                    navigate(`/create-database/${plan_management_id}`)
                } else {
                    setModalContent({
                        isOpenModal: true,
                        components: <PopOver message="Você atingiu o número maximo de base de dados no seu plano."></PopOver>
                    })
                }
            } else {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="O plano da sua conta está desabilitado."></PopOver>
                })
            }

        } else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Nenhum plano foi vinculado a sua conta"></PopOver>
            })
        }
    }

    return <FaPlus className="w-[300px] text-5xl py-3" onClick={handleClickNewDatabases} />

}

export default CreateNewDatabases;

