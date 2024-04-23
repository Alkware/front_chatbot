import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../../../components/button/Button";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL, MAX_AMOUNT_CTA_THAT_CAN_BE_CREATED } from "../../../../variables/variables";
import { useContext } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { MdAdd, MdDelete, MdLink } from "react-icons/md";
import { Root } from "../../../../components/Form/FormRoot";
import { ChatSchema } from "../../../../schema/zod/chatSchema";
import { Call_to_action } from "../../../../@types/Project";

interface CallToActionFormChat {
}

interface Field extends Call_to_action {
    id: string,
}

export function CallToActionFormChat({ }: CallToActionFormChat) {
    const { setModalContent } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();
    const currentCTA = Number(params.get(CTA_NAME_URL));
    const { control, watch } = useFormContext<ChatSchema>();
    const { fields, remove, append, update }: any = useFieldArray({
        control,
        name: "step_1.call_to_action"
    })

    const handleClickButtonLink = (index: number) => {
        // Remove todos as CTA  que não possui um texto no botão antes de adicionar mais CTA;
        const filteredAllFieldWithoutTextInButton = fields.filter((field: any) => !field.button_text);
        filteredAllFieldWithoutTextInButton.forEach((field: any) => {
            let findIndex = fields.findIndex((f: any) => f.id === field.id);
            remove(findIndex);
        });

        const field = watch(`step_1.call_to_action.${index}`);
        const isUniqueField = fields.find((f: any) => f.button_text !== field?.button_text)

        if (isUniqueField) {
            if (fields[index].button_text && !!field) {
                update(index, {
                    button_text: field.button_text,
                    button_link: field.button_link,
                    button_describe: field.button_describe
                })
            }
            else remove(index)
        }

        // Define o botão clicado como atual CTA
        params.set(CTA_NAME_URL, index.toString());
        setParams(params)
    }


    const handleAddCTA = () => {
        // Verifica se o ultimo link 
        if (fields.length < MAX_AMOUNT_CTA_THAT_CAN_BE_CREATED) {
            append({ button_describe: "", button_link: "", button_text: "" })
            const newCurrentCTA = fields.length;
            params.set(CTA_NAME_URL, newCurrentCTA.toString())
            setParams(params)
        } else setModalContent({
            componentName: "modal_limit_cta",
            components:
                <PopOver
                    message="Você pode ter no maximo 3 CTA por chat."
                    componentName="modal_limit_cta"
                    type="WARNING"
                />
        })
    }

    return (
        <div className="flex flex-col ">
            <div className="flex justify-between py-4">
                <div className="flex flex-col text-center">
                    <h2 className="text-xl font-bold">Adicione chamadas para ação no seu chat</h2>
                    <span className="text-sm opacity-70">(Essas CTA serão usadas no contexto da conversa)</span>
                </div>
                <Button
                    type="button"
                    customClass="bg-primary-200"
                    onClick={handleAddCTA}
                >
                    <MdAdd />  Adicionar link
                </Button>
            </div>
            <div className="flex justify-center gap-4 border-b border-primary-100/50">
                {
                    fields.map((field: Field, index: number) =>
                        (index !== currentCTA && !!field.button_text) &&
                        <div className="py-4" key={field.id}>
                            <div
                                data-index={fields.length > 3}
                                className="data-[index=true]:max-w-[150px] max-w-[200px] flex justify-center items-center gap-2 cursor-pointer bg-primary-100 px-3 rounded-lg"
                                onClick={() => handleClickButtonLink(index)}
                            >
                                <span className=" text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis">{field.button_text}</span>
                                <MdLink className="text-xl" />
                            </div>
                        </div>

                    )
                }
            </div>

            <div className="flex justify-center p-4">
                {
                    fields.map((field: Field, index: number) =>
                        (index === currentCTA) &&
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
                                    />
                                </Root.Container>

                                <Root.TextArea
                                    name={`step_1.call_to_action.${index}.button_describe`}
                                    title="Digite a descrição do link"
                                />
                            </Root.Container>
                            <MdDelete
                                className="text-2xl fill-red-500 bg-red-900/50 rounded-full mt-4 cursor-pointer"
                                onClick={() => {
                                    remove(index);
                                    params.set(CTA_NAME_URL, (index - 1).toString());
                                    setParams(params)
                                }}
                            />
                        </Root.Container>
                    )
                }
            </div>



        </div>
    )
};
