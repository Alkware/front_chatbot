import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { CreatePrompt, Prompt } from "../../../../../../../../../../@types/prompt.types";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../variables/variables";
import { daleteDatabase, updateDatabase } from "../../../../../../../../../../api/Prompt";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { DatabaseSchema, databaseSchema } from "../../../../../../../../../../schema/zod/databaseSchema";
import { Button } from "../../../../../../../../../../components/button/Button";
import { MdRemoveCircle } from "react-icons/md";
import { encapsulatedSchema } from "../../../../../../../../../../schema/PromptIA/encapsulated";
import { FaCircleInfo, FaFaceGrinBeam } from "react-icons/fa6";
import { FaBook, FaInfo, FaMoneyCheck, FaQuestionCircle, FaSuitcase, FaTruck } from "react-icons/fa";
import { StepEditCommonQuestions } from "./components/StepCommonQuestions/StepEditCommonQuestions";

interface ModalEditDatabase {
    prompt: Prompt,
    setPrompts: Dispatch<SetStateAction<Prompt[]>>,
}

export function ModalEditDatabase({ prompt, setPrompts }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const promptData: DatabaseSchema = JSON.parse(prompt.prompt_query || "{}")
    const checkPromptIsAvalible = !!Object.keys(promptData).length ? true : false


    const updateDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: !checkPromptIsAvalible ? undefined : {
            step_0: {
                who_created: promptData.step_0.who_created || "",
                andvisa_record: promptData.step_0.andvisa_record || "",
                how_works: promptData.step_0.how_works || "",
                what_is: promptData.step_0.how_works || "",
            },
            step_1: {
                benefits: promptData.step_1.benefits || "",
                contraindications: promptData.step_1.contraindications || "",
                ingredients: promptData.step_1.ingredients || "",
                side_effects: promptData.step_1.side_effects || "",
            },
            step_2: {
                average_delivery_time: {
                    end: promptData.step_2.average_delivery_time.end || 0,
                    start: promptData.step_2.average_delivery_time.start || 0
                },
                order_tracking: promptData.step_2.order_tracking || "",
                tracking_link: promptData.step_2.tracking_link || ""
            },
            step_3: {
                days_of_warranty: promptData.step_3.days_of_warranty || 0,
                disclaimer: promptData.step_3.disclaimer || "",
                how_exchanges_work_and_returns: promptData.step_3.how_exchanges_work_and_returns || "",
                how_guarantee_work: promptData.step_3.how_guarantee_work || ""
            },
            step_4: {
                how_to_buy: promptData.step_4.how_to_buy || "",
                payment_methods: promptData.step_4.payment_methods || "",
                products: promptData.step_4.products || "",
            },
            step_5: {
                address: promptData.step_5.address || "",
                CNPJ: promptData.step_5.CNPJ || "",
                company_name: promptData.step_5.company_name || "",
                contact_email: promptData.step_5.contact_email || "",
                contact_phone_number: promptData.step_5.contact_phone_number || "",
                support_hours: promptData.step_5.support_hours || "",
            },
            step_6: {
                questions: promptData.step_6.questions || "",
            },
            step_7: {
                client_describe: promptData.step_7.client_describe || "",
                ia_name: promptData.step_7.ia_name || "",
                restrictions: promptData.step_7.restrictions
            }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: updateDatabaseForm.control,
        name: 'step_4.products'
    });


    const handleUpdateDatabase = async (data: DatabaseSchema) => {
        const convertToString = JSON.stringify(data);
        const promptSchema = encapsulatedSchema(data);

        const database: CreatePrompt = {
            prompt: promptSchema,
            prompt_query: convertToString,
            client_describe: data.step_7.client_describe,
        };

        if (database) {
            const projectUpdate = await updateDatabase(database, prompt.id);
            if (projectUpdate && projectUpdate.status === 200) {
                setPrompts(prompts => [...prompts.filter(p => p.id !== projectUpdate.data.id), projectUpdate.data])
                setModalContent({
                    componentName: "modal_updated_database",
                    components:
                        <PopOver
                            message="Database atualizado com sucesso"
                            componentName="modal_updated_database"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            }
        }
    }

    async function handleDeleteDatabase() {
        if (prompt.id) {
            // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
            const deleted = await daleteDatabase(prompt.id);

            if (deleted?.status === 200) {
                localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
                setPrompts((data: any) => data.filter((d: any) => d.id !== deleted.data.id))

                setModalContent({
                    componentName: "modal_delete_success",
                    components:
                        <PopOver
                            message="Fonte de dados excluido com sucesso!"
                            componentName="modal_delete_success"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            } else if (deleted?.status === 500) {
                setModalContent({
                    componentName: "modal_failed_delete_database",
                    components:
                        <PopOver
                            message="Você não pode excluir uma fonte de dados que possui um chat vinculado a ela, tente excluir todos os chats primeiro, antes de excluir essa fonte de dados."
                            type="ERROR"
                            componentName="modal_failed_delete_database"
                        />
                })
            }
        }
    }


    return (
        <div className="w-[80vw] h-[70vh] flex overflow-auto ">
            <Root.EditForm
                form={updateDatabaseForm}
                onDelete={handleDeleteDatabase}
                onSubmit={handleUpdateDatabase}
            >

                <Root.EditStep
                    index={0}
                    titleStep="Informações básicas"
                    icon={<FaCircleInfo />}
                >
                    <Root.Input
                        title="Quem foi o criador desse produto?"
                        name="step_0.who_created"
                    />
                    <Root.TextArea
                        title="Conte um pouco sobre seu produto..."
                        height={100}
                        name="step_0.what_is"
                    />

                    <Root.TextArea
                        title="Como ele funciona?"
                        height={100}
                        name="step_0.how_works"
                    />

                    <Root.Optional
                        text="O produto possui registro na ANVISA?"

                    >
                        <Root.Input
                            title="Digite o registro da ANVISA:"
                            name="step_0.andvisa_record"
                        />
                    </Root.Optional>

                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Informações avançadas"
                    icon={<FaInfo />}
                >
                    <Root.TextArea
                        name="step_1.benefits"
                        title="Quais são os beneficios do seu produto?"
                    />

                    <Root.TextArea
                        name="step_1.ingredients"
                        title="Quais são os ingredientes do seu produto?"
                    />

                    <Root.Optional
                        active={true}
                        text="Esse produto possui alguma contra indicação?"
                        name="step_1.contraindications"
                    >
                        <Root.TextArea
                            name="step_1.contraindications"
                            title="Quais são as contra-indicações do seu produto?"
                        />
                    </Root.Optional>

                    <Root.Optional
                        active={true}
                        text="Existe algum efeito colateral?"
                        name="step_1.side_effects"
                    >
                        <Root.TextArea
                            name="step_1.side_effects"
                            title="Quais?"
                        />
                    </Root.Optional>

                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Entrega do produto"
                    icon={<FaTruck />}
                >
                    <Root.Container className="flex gap-4" title="Qual o prazo médio em dias para entrega:">
                        <Root.Input
                            type="number"
                            min={1}
                            max={365}
                            name="step_2.average_delivery_time.start"
                            title="de:"
                            joinAtInput="dia(s)"
                        />

                        <Root.Input
                            type="number"
                            min={1}
                            max={365}
                            name="step_2.average_delivery_time.end"
                            title="até:"
                            joinAtInput="dia(s)"
                        />
                    </Root.Container>


                    <Root.TextArea
                        name="step_2.order_tracking"
                        title="Como os clientes podem rastrear seu pedido?"
                    />

                    <Root.Optional
                        active={false}
                        text="Você possui link para rastrear pedido?"
                    >
                        <Root.Input
                            title="Digite a url do site:"
                            name="step_2.tracking_link"
                            onChange={({ target }) => {
                                if (!target.value.toLowerCase().includes("http"))
                                    target.value = `https://${target.value.replace("http", "")}`
                            }}
                        />
                    </Root.Optional>

                </Root.EditStep>

                <Root.EditStep
                    index={3}
                    titleStep="Politicas e condições"
                    icon={<FaBook />}
                >
                    <Root.Input
                        type="number"
                        name="step_3.days_of_warranty"
                        title="Quantos dias o cliente tem de garantia?"
                    />

                    <Root.TextArea
                        name="step_3.how_guarantee_work"
                        title="Como funciona a garantia?"
                    />


                    <Root.TextArea
                        name="step_3.how_exchanges_work_and_returns"
                        title="Como funciona as trocas e devoluções?"
                    />

                    <Root.Optional active={false} text="Gostaria de deixar um disclaimer para seus clientes?">
                        <Root.TextArea
                            name="step_3.disclaimer"
                            title="Aviso legal ( Disclaimer )"
                        />
                    </Root.Optional>

                </Root.EditStep>

                <Root.EditStep
                    index={4}
                    titleStep="Métodos de pagamentos"
                    icon={<FaMoneyCheck />
                    }
                >
                    <Root.Container className="flex gap-4" title="Quais são os métodos de pagamentos aceitos?">

                        <Root.Select
                            title="Escolha seus métodos de pagamentos"
                            isMultiple={true}
                            name="step_4.payment_methods"
                            options={[
                                { value: "Pix", text: "Pix" },
                                { value: "Boleto", text: "Boleto" },
                                { value: "Cartão de débito", text: "Cartão de débito" },
                                { value: "Cartão de crédito", text: "Cartão de crédito" },
                                { value: "Pagamentos em aplicativo", text: "Pagamentos em aplicativo" },
                            ]}
                        />

                    </Root.Container>

                    <Root.TextArea
                        name="step_4.how_to_buy"
                        title="como comprar seu produto?"
                    />

                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-end">
                            <Button
                                type="button"
                                onClick={() => append({ name: "", value: "R$ 0" })}
                            > Adicionar produto</Button>
                        </div>

                        <Root.Container className="flex flex-col gap-4">
                            {
                                fields.map((field, index) =>

                                    <div key={field.id} className="flex justify-center items-center gap-8">
                                        <div className="w-4/5 flex gap-6 justify-center items-center">
                                            <Root.Input
                                                name={`step_4.products.${index}.name`}
                                                title="De um nome a esse produto:"
                                            />

                                            <Root.Input
                                                name={`step_4.products.${index}.value`}
                                                onChange={({ target }) => {
                                                    const number = parseFloat(target.value.replace(/[^\d]/g, '')) / 100;
                                                    const formatNumber = number.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    });

                                                    target.value = formatNumber
                                                }}
                                                title="Qual o valor do produto?"
                                            />
                                        </div>

                                        <MdRemoveCircle
                                            onClick={() => remove(index)}
                                            className="fill-red-500 text-2xl cursor-pointer"
                                        />
                                    </div>
                                )
                            }
                        </Root.Container>

                    </div>

                </Root.EditStep>

                <Root.EditStep
                    index={5}
                    titleStep="Sobre a empresa"
                    icon={<FaSuitcase />}
                >
                    <Root.Container className="flex gap-4" >
                        <Root.Input
                            name="step_5.company_name"
                            title="Qual o nome da empresa?"
                        />

                        <Root.Input
                            title="Qual o seu CNPJ?"
                            name="step_5.CNPJ"
                            onChange={({ target }) => {
                                if (target.value.length <= 18) {
                                    const numericCnpj = target.value.replace(/[^\d]/g, '');
                                    const formatedCNPJ = numericCnpj.replace(
                                        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                                        '$1.$2.$3/$4-$5'
                                    );

                                    target.value = formatedCNPJ
                                } else target.value = target.value.substring(0, 18)
                            }
                            }
                        />
                    </Root.Container>

                    <Root.Input
                        name="step_5.address"
                        title="Qual o endereço da sua empresa?"
                    />

                    <Root.Container className="flex gap-4" >
                        <Root.Input
                            name="step_5.contact_email"
                            title="Digite um e-mail para contato"
                        />

                        <Root.Input
                            title="Digite um telefone para contato"
                            name="step_5.contact_phone_number"
                            onChange={({ target }) => {
                                const numeric = target.value.replace(/[^\d]/g, '');
                                if (numeric.length < 11) {
                                    let cellPhone;
                                    if (numeric.length === 11) {
                                        cellPhone = numeric.replace(
                                            /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
                                            '($1) $2 $3-$4'
                                        );
                                    } else {
                                        cellPhone = numeric.replace(
                                            /^(\d{2})(\d{4})(\d{4})$/,
                                            '($1) $2-$3'
                                        );
                                    }

                                    target.value = cellPhone
                                } else target.value = target.value.substring(0, 15)
                            }
                            }
                        />
                    </Root.Container>

                    <Root.Input
                        name="step_5.support_hours"
                        title="Qual seu horário para suporte humano?"
                    />

                </Root.EditStep>

                <Root.EditStep
                    index={6}
                    titleStep="Perguntas frequentes"
                    icon={<FaQuestionCircle />}
                >
                    <StepEditCommonQuestions />
                </Root.EditStep>

                <Root.EditStep
                    index={7}
                    titleStep="Personalidade da IA "
                    icon={<FaFaceGrinBeam />}
                >

                    <Root.Optional
                        text="Deseja dar um nome a sua inteligência artificial?"
                        active={false}
                    >
                        <Root.Input
                            name="step_7.ia_name"
                            title="Qual o nome da sua inteligência artificial?"
                        />
                    </Root.Optional>

                    <Root.Optional
                        text="Deseja adicionar restrições de palavras ou frase?"
                        active={false}
                        name="step_7.restrictions"
                    >
                        <Root.Input
                            name="step_7.restrictions"
                            title="Faça uma lista de restrições para que a IA evite utiliza-la em uma conversa"
                        />
                    </Root.Optional>

                    <Root.TextArea
                        title="Faça uma breve descrição de quem é seu público (cliente)"
                        name="step_7.client_describe"
                    />

                </Root.EditStep>



            </Root.EditForm>

        </div >
    )
};