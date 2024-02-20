import { useContext } from "react";
import { Prompt } from "../../../../@types/prompt.types";
import { createNewDatabase } from "../../../../api/Prompt";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { ModalContext } from "../../../../context/ModalContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { Root } from "../../../../components/Form/FormRoot";

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

            const { prompt, client_describe, prompt_query }: Prompt = database;

            const databaseCreated = await createNewDatabase({
                prompt_query,
                prompt,
                plan_management_id,
                client_describe,
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
        <Root.Container
            onSubmit={handleCreateDatabase}
        >
            <Root.Step
                index={0}
                stepTitle="Configurações básicas:"
            >

                <Root.Input
                    name="prompt_name"
                    title="De um nome a sua fonte de dados"
                />

            </Root.Step>

            <Root.Step
                index={1}
                stepTitle="Informações básicas do produto:"
            >

                <Root.TextArea
                    name="about_product"
                    title="Conte para nós um pouco sobre seu produto:"
                    height={100}
                />

                <Root.Input
                    name="who_created"
                    title="Quem foi o criador desse produto?"
                />

                <Root.TextArea
                    name="how_works"
                    title="Como ele funciona?"
                    height={100}
                />

                <Root.Optional
                    name="anvisa"
                    active={false}
                    text={"Esse produto tem registro na ANVISA?"}
                >
                    <Root.Input
                        name="anvisa.register"
                        title="Registro da anvisa"
                    />
                </Root.Optional>


            </Root.Step>

            <Root.Step
                index={2}
                stepTitle="Informações avançadas do produto:"
            >

                <Root.TextArea
                    name="about_product"
                    title="Conte para nós um pouco sobre seu produto:"
                    height={100}
                />

                <Root.Input
                    name="who_created"
                    title="Quem foi o criador desse produto?"
                />

                <Root.TextArea
                    name="how_works"
                    title="Como ele funciona?"
                    height={100}
                />

                <Root.Optional
                    name="anvisa"
                    active={false}
                    text="Esse produto tem registro na ANVISA?"
                >
                    <Root.Input
                        name="anvisa.register"
                        title="Registro da anvisa"
                    />
                </Root.Optional>


            </Root.Step>

            <Root.Step
                index={3}
                stepTitle="Dados da empresa:"
            >
                <Root.Input
                    name="address"
                    title="Digite o endereço da sua empresa"
                />

                <Root.Container
                    className="flex"
                >
                    <Root.Input
                        type="email"
                        name="support.email_to_support"
                        title="Digite um e-mail para contato"
                    />

                    <Root.Input
                        type="tel"
                        name="support.cell_phone_to_support"
                        title="Digite um número de telefone para contato"
                    />
                </Root.Container>

                <Root.Container
                >
                    <Root.Input
                        name="support_hour.start"
                        title="Suporte ao cliente começa às:"
                    />
                    <Root.Input
                        name="support_hour.end"
                        title="Termina às:"
                    />
                </Root.Container>


                <Root.Optional
                    name="register"
                    active={false}
                    text={"Deseja adicionar cnpj?"}
                >
                    <Root.Input
                        name="register.cnpj"
                        title="Informe seu cnpj"
                    />
                </Root.Optional>

            </Root.Step>
        </Root.Container>
    )
};