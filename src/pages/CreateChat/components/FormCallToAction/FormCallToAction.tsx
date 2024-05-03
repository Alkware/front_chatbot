import { useFieldArray, useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Root } from "../../../../components/Form/FormRoot";
import { ChatSchema } from "../../../../schema/zod/chatSchema";
import { Call_to_action } from "../../../../@types/Project";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { Prompt } from "../../../../@types/prompt.types";
import { DatabaseSchema } from "../../../../schema/zod/databaseSchema";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { Select } from "../../../../components/Select/Select";
import { Button } from "../../../../components/button/Button";

interface CallToActionFormChat {
    prompts: Prompt[]
}

interface Field extends Call_to_action {
    id: string,
}

export function CallToActionFormChat({ prompts }: CallToActionFormChat) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { control, watch } = useFormContext<ChatSchema>();
    const { fields, remove, append, update }: any = useFieldArray({
        control,
        name: "step_1.call_to_action"
    })

    useEffect(() => {
        !fields.length && append({ button_text: "", button_link: "", button_describe: "", })
    }, []);

    const handleAddCTA = () => {
        const callToActions: { button_text: string, button_link: string, button_describe: string }[] | undefined = watch(`step_1.call_to_action`);
        const cta = callToActions && callToActions[fields.length - 1];
        const prompt_id = watch(`step_1.prompt_id`);
        const promptSelected = prompts.find(prompt => prompt.id === prompt_id);
        const convertObject: DatabaseSchema = promptSelected && JSON.parse(promptSelected.prompt_query);
        const products = convertObject.step_0.products.map((product, index) => Object({ id: index, name: product.name }));
        const removeProductsSelected = products.filter((product) => !callToActions?.find(cta => cta.button_text === product.name) && product);

        const handleSelectDatabase = (e: any) => {
            const index = e.target.value;
            const selected = products[index]
            append({ button_text: selected.name, button_link: "", button_describe: "", })
            clearModal("modal_show_select_products");
        }

        if (cta && cta.button_text && cta.button_link) {
            if (cta.button_describe.length > 30) {
                removeProductsSelected.length > 0 ?
                    setModalContent({
                        componentName: "modal_show_select_products",
                        components:
                            <PopUp>
                                <div className="max-w-[500px] space-y-8">
                                    <div>
                                        <h2 className="text-2xl text-center font-medium">Criar CTA para seus produtos</h2>
                                        <p className="w-full text-center opacity-80 ">
                                            Recomendamos que você crie links para seus produtos, para que nossa IA, possa redirecionar o usuário quando houver interesse no produto.
                                        </p>
                                    </div>
                                    <Select
                                        options={removeProductsSelected}
                                        title="Selecionar produto"
                                        handleSelectDatabase={handleSelectDatabase}
                                    />
                                    <div className="flex justify-evenly">
                                        <Button
                                            onClick={() => {
                                                clearModal("modal_show_select_products");
                                                append({ button_text: "", button_link: "", button_describe: "", })
                                            }}
                                        >Criar customizado</Button>
                                    </div>
                                </div>
                            </PopUp>
                    })
                    :
                    append({ button_text: "", button_link: "", button_describe: "", })
            } else setModalContent({
                componentName: "modal_error_min_text",
                components:
                    <PopOver
                        componentName="modal_error_min_text"
                        message="Digite uma descrição maior para sua CTA, lembre-se que ela é muito importante para nossa IA entender o contexto da conversa."
                        type="WARNING"
                    />
            })

        } else {
            setModalContent({
                componentName: "modal_error_add_product",
                components:
                    <PopOver
                        componentName="modal_error_add_product"
                        message="Preencha todos os dados antes de adicionar uma nova CTA"
                        type="WARNING"
                    />
            })
        }
    }

    return (
        <div className="flex flex-col ">
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-center">
                    <h2 className="text-xl font-bold">Adicione chamadas para ação no seu chat</h2>
                    <span className="text-sm opacity-70">(Essas CTA serão usadas no contexto da conversa)</span>
                </div>
            </div>
            <Root.MultipleInput
                name="step_1.call_to_action"
                remove={remove}
                update={update}
            >
                {
                    fields.map((field: Field, index: number) =>
                        <Root.Container className="flex gap-4" key={field.id}>
                            <Root.Container className="flex flex-col gap-8">
                                <Root.Container className="flex gap-4">
                                    <Root.Input
                                        name={`step_1.call_to_action.${index}.button_text`}
                                        title={`Digite o texto do link`}
                                    />
                                    <Root.Input
                                        name={`step_1.call_to_action.${index}.button_link`}
                                        title={`Digite a url do link`}
                                        onChange={({ target }) => {
                                            if (!target.value.toLowerCase().includes("http"))
                                                target.value = `https://${target.value.replace("http", "")}`
                                        }}
                                    />
                                </Root.Container>

                                <Root.TextArea
                                    name={`step_1.call_to_action.${index}.button_describe`}
                                    title="Digite a descrição do link"
                                />
                            </Root.Container>
                            <div className="flex flex-col gap-4">
                                <MdAdd
                                    className="text-3xl p-1 fill-primary-100 bg-primary-300 rounded-full cursor-pointer"
                                    onClick={handleAddCTA}
                                />
                                <MdDelete
                                    className="text-3xl p-1 fill-red-500 bg-red-900/50 rounded-full cursor-pointer"
                                    onClick={() => fields.length > 1 && remove(index)}
                                />
                            </div>
                        </Root.Container>
                    )
                }
            </Root.MultipleInput>
        </div>
    )
};
