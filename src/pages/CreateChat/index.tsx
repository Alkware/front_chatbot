import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { createNewProject } from "../../api/project";
import { PopOver } from "../../components/modal/templates/PopOver";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectCreateTypes } from "../../@types/Project";
import { ModalContext } from "../../context/ModalContext";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { Button } from "../../components/button/Button";
import { Steps } from "./components/Steps";
import { IoIosCreate} from "react-icons/io";
import { SimulatorChat } from "../../components/SimulatorChat";
import { GeneralInformation } from "../../components/Forms/ChatForm/components/GeneralInformation";
import { ProductDescribe } from "../../components/Forms/ChatForm/components/ProductDescribe";
import { ButtonSteps } from "./components/ButtonSteps";

export function CreateChat() {
    const { setModalContent } = useContext(ModalContext);
    const { plan_management_id } = useParams();
    const [currentIndex ] = useState(0)
    const navigate = useNavigate();
    const containerForm: RefObject<HTMLDivElement> = useRef(null);
    const tabIndex = ["general_information", "product_describe"]

    useEffect(() => {
        (async () => {
            const planManagement = await getPlanManagementById(plan_management_id)
            if (!planManagement) navigate("/panel")
        })()
    }, [])

    const handleCreateProject = async () => {
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")
            const data = checkInputEmpty();

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
        } catch (error) {
            throw new Error("Erro ao tentar criar o projeto")
        }
    }

    const checkInputEmpty = () => {
        const chat = JSON.parse(localStorage.getItem("chat") || "{}")
        const errorInputs = { message: "" };

        if (currentIndex === 0 && !chat.project_name) errorInputs.message = "Você precisa definir o nome do seu chat."
        else if (currentIndex === 0 && !chat.bio) errorInputs.message = "Você precisa definir uma bio para seu chat."
        else if (currentIndex === 0 && !chat.logo) errorInputs.message = "Você precisa enviar uma logo para seu chat."
        else if (currentIndex === 1 && !chat.prompt_id) errorInputs.message = "Você precisa selecionar uma fonte de dados."
        else if (currentIndex === 1 && !chat.chat_input_message) errorInputs.message = "Você precisa definir uma primeira mensagem em seu chat."
        else if (currentIndex === 1 && !chat.call_to_action[0].button_text) errorInputs.message = "Você precisa definir um texto para o seu botão de CTA."
        else if (currentIndex === 1 && !chat.call_to_action[0].button_link) errorInputs.message = "Você precisa definir um link para seu botão CTA."

        if (errorInputs.message.length > 0) {
            setModalContent({ isOpenModal: true, components: <PopOver message={errorInputs.message} type="WARNING" /> })
            return
        }else return chat
    }



    return (
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Steps
                    numberSteps={tabIndex.length}
                    currentIndex={currentIndex}
                />

                <div className="w-full flex justify-center gap-8">

                    <div
                        ref={containerForm}
                        className="flex flex-col gap-12 w-3/4 max-w-[700px]"
                    >

                        <GeneralInformation />

                        <ProductDescribe

                        />

                        {
                            currentIndex === (tabIndex.length - 1) &&
                            <Button
                                customClass="w-full mt-8 bg-primary-100 p-3 flex justify-center gap-x-2 rounded-xl items-center uppercase cursor-pointer font-bold hover:brightness-110 transition-colors"
                                onClick={handleCreateProject}
                            >
                                Criar chat
                                <IoIosCreate className="text-xl" />
                            </Button>
                        }

                        <ButtonSteps 
                            stepSize={tabIndex.length}
                        />
                    </div>

                    <SimulatorChat />
                </div>
            </div>
        </div >
    )
};