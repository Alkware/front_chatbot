import { useContext } from "react";
import { Prompt } from "../../../../@types/prompt.types";
import { createNewDatabase } from "../../../../api/Prompt";
import { Form } from "../../../../components/Forms/Form";
import { ButtonsFormCreate } from "../../../../components/Forms/components/FormInputs/components/ButtonSteps/ButtonSteps";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { ModalContext } from "../../../../context/ModalContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PopOver } from "../../../../components/modal/templates/PopOver";

interface FormCreateDatabase {
    plan_management_id: string;
};

export function FormCreateDatabase({ plan_management_id }: FormCreateDatabase) {
    const { setModalContent } = useContext(ModalContext);
    const [params] = useSearchParams();
    const navigate = useNavigate();

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
        <Form.Container
            formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
        >
            <Form.Step
                index={0}
                titleStep="Configurações básicas:"
            >

                <Form.Input
                    fieldName="prompt_name"
                    title="De um nome a sua fonte de dados"
                />

            </Form.Step>

            <Form.Step
                index={1}
                titleStep="Informações básicas do produto:"
            >

                <Form.TextArea
                    fieldName="about_product"
                    title="Conte para nós um pouco sobre seu produto:"
                    height={100}
                />

                <Form.Input
                    fieldName="who_created"
                    title="Quem foi o criador desse produto?"
                />

                <Form.TextArea
                    fieldName="how_works"
                    title="Como ele funciona?"
                    height={100}
                />

                <Form.Optional
                    fieldName="anvisa"
                    optional={{ active: false, optional: true, text: "Esse produto tem registro na ANVISA?" }}
                >
                    <Form.Input
                        fieldName="anvisa.register"
                        title="Registro da anvisa"
                    />
                </Form.Optional>


            </Form.Step>

            <Form.Step
                index={2}
                titleStep="Informações avançadas do produto:"
            >

                <Form.TextArea
                    fieldName="about_product"
                    title="Conte para nós um pouco sobre seu produto:"
                    height={100}
                />

                <Form.Input
                    fieldName="who_created"
                    title="Quem foi o criador desse produto?"
                />

                <Form.TextArea
                    fieldName="how_works"
                    title="Como ele funciona?"
                    height={100}
                />

                <Form.Optional
                    fieldName="anvisa"
                    optional={{ active: false, optional: true, text: "Esse produto tem registro na ANVISA?" }}
                >
                    <Form.Input
                        fieldName="anvisa.register"
                        title="Registro da anvisa"
                    />
                </Form.Optional>


            </Form.Step>

            <Form.Step
                index={3}
                titleStep="Dados da empresa:"
            >
                <Form.Input
                    fieldName="address"
                    title="Digite o endereço da sua empresa"
                />

                <Form.Multiple
                    fieldName="support"
                >
                    <Form.Input
                        type="email"
                        fieldName="support.email_to_support"
                        title="Digite um e-mail para contato"
                    />

                    <Form.Input
                        type="tel"
                        fieldName="support.cell_phone_to_support"
                        title="Digite um número de telefone para contato"
                    />
                </Form.Multiple>

                <Form.Multiple
                    fieldName="support_hour"
                >
                    <Form.InputHour
                        fatherName="support_hour.start"
                        title="Suporte ao cliente começa às:"
                    />
                    <Form.InputHour
                        fatherName="support_hour.end"
                        title="Termina às:"
                    />
                </Form.Multiple>


                <Form.Optional
                    fieldName="register"
                    optional={{ active: false, optional: true, text: "Deseja adicionar cnpj?" }}
                >
                    <Form.Input
                        fieldName="register.cnpj"
                        title="Informe seu cnpj"
                    />
                </Form.Optional>

            </Form.Step>



            <Form.ControllerButton>

                <ButtonsFormCreate
                    plan_management_id={plan_management_id}
                    formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                    eventSubmit={handleCreateDatabase}
                />

            </Form.ControllerButton>
        </Form.Container>
    )
};