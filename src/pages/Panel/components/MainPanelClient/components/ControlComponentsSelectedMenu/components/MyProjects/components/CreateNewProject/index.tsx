import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";

function CreateNewProject({ plan_management_id }: { plan_management_id: string }) {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleClickNewProject = () => {
        if (client?.plan_management) {
            const maxPlans = client.plan_management.plan.max_projects;
            const currentNumberOfProjects = client.plan_management.project.length

            if (client.plan_management.status !== "DISABLED") {
                if (maxPlans > currentNumberOfProjects) {
                    navigate(`/create-chat/${plan_management_id}`)
                } else {
                    setModalContent({
                        isOpenModal: true,
                        components: <PopOver message="Você atingiu o número maximo por plano."></PopOver>
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

export default CreateNewProject;

