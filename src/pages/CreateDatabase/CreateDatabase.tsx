import { useContext, useEffect } from "react";
import { PopOver } from "../../components/modal/templates/PopOver";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { getPlanManagementById } from "../../api/planManagement";
import { createNewDatabase } from "../../api/Prompt";
import { Prompt } from "../../@types/prompt.types";
import { BackHome } from "../CreateChat/components/BackHome";
import { Form } from "../../components/Forms/Form";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../variables/variables";
import { ButtonsFormCreate } from "../../components/Forms/components/FormInputs/components/ButtonSteps/ButtonSteps";


export function CreateDatabase() {
    const { setModalContent } = useContext(ModalContext);
    const { plan_management_id } = useParams();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)


            const planManagement = await getPlanManagementById(plan_management_id)
            if (!planManagement) navigate("/panel")
        })()
    }, [])

    const handleCreateDatabase = async () => {
        try {
            const data = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}")

            const database: any = {}

            Object.keys(data).forEach(keyStep => {
                Object.keys(data[keyStep]).forEach((key) => database[key] = data[keyStep][key])
            })

            if (!plan_management_id) throw new Error("plan management id is missing!")

            const { prompt, describe_client, prompt_name }: Prompt = database;

            const databaseCreated = await createNewDatabase({
                prompt_name,
                prompt,
                plan_management_id,
                describe_client,
            });

            if (databaseCreated && databaseCreated.status === 201) {
                setModalContent({
                    componentName: "modal_database_create_sucess",
                    components: <PopOver message="Database criada com sucesso" componentName="modal_database_create_sucess" />
                })

                const timeout = setTimeout(() => {
                    const from = params.get("from")
                    if (from === "create") navigate(`/create-chat/${plan_management_id}?form-step=1`)
                    else navigate("/panel?tab=2")
                    clearTimeout(timeout)
                }, 2000);

            }
        } catch (error) {
            throw new Error("Erro ao tentar criar o projeto")
        }
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center">
            <div className="w-4/5 flex flex-col gap-2 justify-center items-center">

                <BackHome />

                <Form.Container
                    formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                >
                    <Form.Step
                        index={0}
                    >

                        <Form.Input
                            fieldName="prompt_name"
                            title="De um nome a sua fonte de dados"
                        />
                        <Form.TextArea
                            fieldName="prompt"
                            title="Escreva seu prompt"
                            height={200}
                        />

                    </Form.Step>

                    <Form.Step
                        index={1}
                    >
                        <Form.TextArea
                            fieldName="describe_client"
                            title="Faça uma descrição do seu cliente."
                            height={100}
                        />
                    </Form.Step>

                    <Form.ControllerButton>

                        <ButtonsFormCreate
                            plan_management_id={plan_management_id}
                            formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                            eventSubmit={handleCreateDatabase}
                        />

                    </Form.ControllerButton>
                </Form.Container>


            </div>
        </div >
    )
};