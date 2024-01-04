import { IoIosCreate } from "react-icons/io";
import { Button } from "../../../../../../components/button/Button";
import { ProjectCreateTypes } from "../../../../../../@types/Project";
import { createNewProject } from "../../../../../../api/project";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import { useContext } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { useNavigate } from "react-router-dom";

interface ButtonAction {
    display: boolean
    checkInputEmpty: () => ProjectCreateTypes,
    plan_management_id: string
}


export function ButtonAction({ display, checkInputEmpty, plan_management_id }: ButtonAction) {
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();

    const handleCreateProject = async () => {
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")
            const data = checkInputEmpty()

            const {
                project_name, logo, prompt_id, bio, call_to_action, chat_input_message, chat_type
            }: ProjectCreateTypes = data;

            const project = await createNewProject({
                project_name,
                logo,
                prompt_id,
                plan_management_id,
                bio,
                call_to_action,
                chat_input_message,
                chat_type,
            });

            if (project && project.status === 201) {
                localStorage.removeItem("chat")

                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat criado com sucesso" />
                })

                const timeout = setTimeout(() => {
                    navigate("/panel")
                    clearTimeout(timeout)
                }, 2000);

            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
    return (
        display &&
        <Button
            onClick={handleCreateProject}
        >
            Criar chat
            <IoIosCreate className="text-xl" />
        </Button>
    )
};