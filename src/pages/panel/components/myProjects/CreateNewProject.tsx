import { useContext } from "react";
import Button from "../../../../components/button/ButtonBlue";

import { ModalContext } from "../../../../context/ModalContext";
import { ModalCreateProject } from "../../modals/ModalCreateProject";
import { ClientContext } from "../../../../context/ClientContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";



interface NewProjectTypes {
    client_id: string,
    setNewProject: any
}


function CreateNewProject({ setNewProject }: NewProjectTypes) {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)

    const handleClickNewProject = () => {
        if (client?.plan_management) {
            const maxPlans = client.plan_management.plan.max_projects;
            const currentNumberOfProjects = client.plan_management.project.length

            console.log("CreateNewProject", client)

            if (client.plan_management.status !== "DISABLED") {
                if (maxPlans > currentNumberOfProjects) {
                    setModalContent({
                        isOpenModal: true,
                        components: <ModalCreateProject plan_management_id={client.plan_management.id} setNewProject={setNewProject} />
                    })
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

    return <Button onClick={handleClickNewProject}>Novo chat</Button>

}

export default CreateNewProject;

