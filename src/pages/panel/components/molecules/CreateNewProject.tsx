import { useContext } from "react";
import Button from "../../../../components/button/Button";

import { ModalContext } from "../../../../context/ModalContext";
import { ModalCreateProject } from "../../modals/ModalCreateProject";



interface NewProjectTypes {
    client_id: string,
    setNewProject: any
}


function CreateNewProject({ client_id, setNewProject }: NewProjectTypes) {
    const { setModalContent } = useContext(ModalContext)

    const handleClickNewProject = () => {
        setModalContent({
            isOpenModal: true,
            components: <ModalCreateProject client_id={client_id} setNewProject={setNewProject} />
        })
    }

    return <Button onClick={handleClickNewProject}>Novo chat</Button>
    
}

export default CreateNewProject;

